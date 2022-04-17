import { ReactElement, FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

import * as Types from './Entries.types';

const Entries: FC<Readonly<Types.EntriesProps>> = ({ entriesForDay }): ReactElement => (
  <div className="syntaxhighlight">
    <SyntaxHighlighter
      language="json"
      showLineNumbers={true}
      style={style}
    >
      {JSON.stringify(entriesForDay, null, 4)}
    </SyntaxHighlighter>
  </div>
);

export default Entries;
