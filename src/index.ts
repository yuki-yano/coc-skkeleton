import { CompleteResult, events, ExtensionContext, sources, VimCompleteItem, workspace } from 'coc.nvim';

export const activate = async (context: ExtensionContext): Promise<void> => {
  context.subscriptions.push(
    sources.createSource({
      name: 'skkeleton',
      doComplete: async (option) => {
        const items = await getCompletionItems();
        return { ...items };
      },
    })
  );
};

const getCompletionItems = async (): Promise<CompleteResult> => {
  const candidates = (await workspace.nvim.call('denops#request', ['skkeleton', 'getCandidates', []])) as Array<
    [string, Array<string>]
  >;

  const items: Array<VimCompleteItem> = candidates.flatMap((candidate) => {
    const [kana, word] = candidate;
    return word
      .filter((word) => word.trim() !== '')
      .map((word) => ({
        word: `${kana}`,
        menu: '[skkeleton]',
        info: `${kana}\n${word}`,
        abbr: word,
      }));
  });

  return {
    items,
  };
};
