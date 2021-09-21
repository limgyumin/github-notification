import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GraphQLClient, gql } from 'graphql-request';
import axios from 'axios';

import { GitHubContribution, GitHubUser } from 'src/utils/types/github.type';
import config from 'src/config';

const graphQLClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    authorization: `token ${config.GITHUB_TOKEN}`,
  },
});

@Injectable()
export class GitHubLib {
  async getGitHubUser(code: string): Promise<GitHubUser | null> {
    const { GITHUB_ID, GITHUB_SECRET } = config;

    try {
      const {
        data: { access_token },
      } = await axios.post<{ access_token: string }>(
        'https://github.com/login/oauth/access_token',
        {
          code,
          client_id: GITHUB_ID,
          client_secret: GITHUB_SECRET,
        },
        {
          headers: {
            accept: 'application/json',
          },
        },
      );

      const { data } = await axios.get<GitHubUser>(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `token ${access_token}`,
          },
        },
      );

      return data;
    } catch (e: any) {
      if (e.response.status === HttpStatus.NOT_FOUND) {
        return null;
      }

      throw e;
    }
  }

  async getContributionByUser(
    username: string,
  ): Promise<GitHubContribution | null> {
    const query = gql`
      query getContribution($login: String!) {
        user(login: $login) {
          login
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
        }
      }
    `;

    try {
      const data = await graphQLClient.request<GitHubContribution>(query, {
        login: username,
      });

      return data;
    } catch (e: any) {
      Logger.error(e);

      return null;
    }
  }
}
