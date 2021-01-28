import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { InitialState } from '../state/reducers';
import { selectItem } from '../state/actions';
import { FeedItem } from '../types';

interface Props {
  item: FeedItem | null;
  unselectItem: () => {};
}

const ItemView: React.FC<Props> = ({ item, unselectItem }) => (
  <div
    className={`flex-1 border-l transition bg-white border-gray-300 dark:bg-gray-900 dark:border-black ${
      item ? 'flex' : 'hidden md:flex'
    }`}
  >
    {item ? (
      <div className="flex-1 px-10 py-6">
        <button className="absolute right-0 top-0 p-3" onClick={unselectItem}>
          <svg
            aria-label="Close"
            className="w-4 fill-current"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
          </svg>
        </button>
        <h1 className="text-4xl leading-tight font-light mb-6">{item.title}</h1>
        <ul className="unstyled mb-6 text-sm text-gray-600 dark:text-gray-500">
          <li className="mb-2">
            <span className="mr-2" role="img" aria-label="Calendar">
              🗓
            </span>
            {dayjs(item.pubDate).format('DD/MM/YYYY')}
          </li>
          {item.author && (
            <li className="mb-2">
              <span className="mr-2" role="img" aria-label="User">
                👤
              </span>
              {item.author}
            </li>
          )}
          {item.link && (
            <li className="mb-2">
              <a href={item.link} rel="noopener noreferrer" target="_blank">
                <span className="mr-2" role="img" aria-label="Link">
                  🔗
                </span>
                Permalink
              </a>
            </li>
          )}
        </ul>
        <div
          className={`wysiwyg mb-10 wysiwyg-${item.title}`}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    ) : (
      <div className="m-auto">
        <p className="text-2xl text-gray-500">Pick an item to read</p>
      </div>
    )}
  </div>
);

const mapStateToProps = (state: InitialState) => ({
  item:
    state.selectedFeed !== null && state.selectedItem !== null
      ? state.feeds[state.selectedFeed].items[state.selectedItem]
      : null,
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unselectItem: () => dispatch(selectItem(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
