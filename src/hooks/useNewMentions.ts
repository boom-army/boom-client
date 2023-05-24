import { atom, useRecoilState } from 'recoil';
import { NewMentionsQuery } from '../generated/graphql';

// Recoil atom to store the array of new mentions
const newMentionsState = atom<NewMentionsQuery | undefined>({
  key: 'newMentionsState',
  default: undefined,
});

// Recoil hook to capture new mentions and mark them as read
export const useNewMentions = () => {
  const [newMentions, setNewMentions] = useRecoilState<NewMentionsQuery | undefined>(newMentionsState);

  // Function to mark new mentions as read
  const markNewMentionsAsRead = () => {
    setNewMentions(undefined);
  };

  return { newMentions, setNewMentions, markNewMentionsAsRead };
};