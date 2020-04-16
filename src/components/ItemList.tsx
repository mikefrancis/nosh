import dayjs from "dayjs";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  selectItem,
  unSubscribeFeed,
  setUnsubscribeFeedModalVisibility,
} from "../state/actions";
import UnsubscribeFeedModal from "./UnsubscribeFeedModal";
import { InitialState, Themes } from "../state/reducers";
import useClickOutside from "./useClickOutside";

interface Props {
  feeds: Feed[];
  items: FeedItem[];
  isUnsubscribeFeedModalOpen: boolean;
  openUnsubscribeModal: () => {};
  selectedFeed: number;
  selectedItem: number | null;
  theme: Themes;
  unSubscribeFeed: (index: number) => {};
  viewItem: (index: number) => {};
}

const ItemList: React.FC<Props> = ({
  feeds,
  items,
  isUnsubscribeFeedModalOpen,
  openUnsubscribeModal,
  selectedFeed,
  selectedItem,
  theme,
  viewItem,
}) => {
  const [isMenuVisible, setMenuVisible] = React.useState(false);
  const dropdownMenuRef = React.createRef<HTMLDivElement>();
  const feed = feeds[selectedFeed];

  useClickOutside(dropdownMenuRef, () => setMenuVisible(false));

  // TODO: Display something useful
  if (!feed) {
    return null;
  }

  return (
    <>
      <section className="sticky top-0 w-2/5 max-h-screen overflow-scroll">
        <div
          className={`border-b ${
            theme === Themes.LIGHT
              ? "bg-gray-300 border-gray-400"
              : "bg-gray-800 border-black"
          } sticky top-0 flex items-center`}
        >
          <h2 className="flex-1 px-3 py-1 uppercase font-bold text-xs tracking-wide truncate">
            {feed.title}
          </h2>
          <div className="relative ml-4">
            <button
              onClick={() => setMenuVisible(!isMenuVisible)}
              className="px-3 py-1 uppercase font-bold text-xs tracking-wide ml-4"
            >
              <span className="-mr-1" role="img" aria-label="Settings">
                ⚙️
              </span>
            </button>
            {isMenuVisible && (
              <div
                ref={dropdownMenuRef}
                className={`absolute shadow py-2 text-xs right-0 border ${
                  theme === Themes.LIGHT
                    ? "bg-white border-gray-400"
                    : "bg-gray-800 border-black"
                } -mr-px`}
              >
                <a
                  className={`block w-full px-3 py-1 pr-10 ${
                    theme === Themes.LIGHT
                      ? "hover:bg-gray-200"
                      : "hover:bg-gray-700"
                  }`}
                  href={feed.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="pr-1" role="img" aria-label="Link">
                    🔗
                  </span>
                  Permalink
                </a>
                <button
                  onClick={() => openUnsubscribeModal()}
                  className={`block w-full px-3 py-1 pr-10 ${
                    theme === Themes.LIGHT
                      ? "hover:bg-gray-200"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span className="pr-1" role="img" aria-label="Filter">
                    🗑
                  </span>
                  Unsubscribe
                </button>
              </div>
            )}
          </div>
        </div>
        {items.length > 0 ? (
          <>
            {items.map((item, i) => (
              <article
                onClick={() => viewItem(i)}
                className={`${
                  i > 0
                    ? `border-t ${
                        theme === Themes.LIGHT
                          ? "border-gray-400"
                          : "border-black"
                      }`
                    : ""
                } ${theme === Themes.LIGHT ? "bg-white" : "bg-gray-900"} ${
                  selectedItem === i
                    ? "bg-indigo-600 text-white"
                    : theme === Themes.LIGHT
                    ? "hover:bg-gray-100"
                    : "hover:bg-gray-800"
                } cursor-pointer w-full text-left py-2 px-3 text-xs`}
                key={`feed-${selectedFeed}-item-${i}`}
              >
                <div className="flex">
                  <h4 className="flex-1 truncate">{item.author}</h4>
                  <p
                    className={`pl-4 ${
                      selectedItem === i ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {dayjs(item.pubDate).format("DD/MM/YYYY")}
                  </p>
                </div>
                <h3 className="text-sm font-bold truncate">{item.title}</h3>
                <p
                  className={`max-lines ${
                    selectedItem === i ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </>
        ) : (
          <div className="p-3 text-center text-sm">
            <span role="img" aria-label="Thinking face">
              🤔
            </span>{" "}
            There doesn't seem to be any items in this feed.
          </div>
        )}
      </section>
      {isUnsubscribeFeedModalOpen && <UnsubscribeFeedModal />}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  isUnsubscribeFeedModalOpen: state.ui.isUnsubscribeFeedModalOpen,
  selectedFeed: state.selectedFeed as number,
  selectedItem: state.selectedItem as number,
  feeds: state.feeds,
  items:
    state.selectedFeed !== null ? state.feeds[state.selectedFeed].items : [],
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unSubscribeFeed: (i: number) => dispatch(unSubscribeFeed(i)),
  viewItem: (i: number) => dispatch(selectItem(i)),
  openUnsubscribeModal: () => dispatch(setUnsubscribeFeedModalVisibility(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
