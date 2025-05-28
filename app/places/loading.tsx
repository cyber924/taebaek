import { Loading } from '@/components/ui/loading';
import { LOADING_MESSAGES } from '@/lib/constants';

export default function PlacesLoading() {
  return <Loading message={LOADING_MESSAGES.PLACE_LIST} />;
}