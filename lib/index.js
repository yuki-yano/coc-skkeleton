var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/index.ts
__markAsModule(exports);
__export(exports, {
  activate: () => activate
});
var import_coc = __toModule(require("coc.nvim"));
var activate = async (context) => {
  context.subscriptions.push(import_coc.sources.createSource({
    name: "skkeleton",
    doComplete: async (option) => {
      const items = await getCompletionItems();
      return {...items};
    }
  }));
};
var getCompletionItems = async () => {
  const candidates = await import_coc.workspace.nvim.call("denops#request", ["skkeleton", "getCandidates", []]);
  const items = candidates.flatMap((candidate) => {
    const [kana, word] = candidate;
    return word.filter((word2) => word2.trim() !== "").map((word2) => ({
      word: `${kana}`,
      menu: "[skkeleton]",
      info: `${kana}
${word2}`,
      abbr: word2
    }));
  });
  return {
    items
  };
};
