import { makeLoud } from '../utils/makeLoud';

export const html = {
  loudlyBind: function(documentToBind: Document) {
    const getElementById = makeLoud(documentToBind.getElementById, documentToBind);

    const input = {
      byId: (id: string) => getElementById(id) as HTMLInputElement
    };

    return {
      getElementById,
      get: {
        input
      }
    };
  }
};
