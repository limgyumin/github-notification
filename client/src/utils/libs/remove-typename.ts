type Typename = {
  __typename: string;
};

type ObjectWithTypename = object & Typename;

export const removeTypename = <T extends ObjectWithTypename>(
  object: T
): Omit<T, "__typename"> => {
  if (object.hasOwnProperty("__typename")) {
    const copiedObject = { ...object };
    const { __typename, ...rest } = copiedObject;

    return rest;
  }
  return object;
};
