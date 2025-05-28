import { Loading } from '@/components/ui/loading';
import { LOADING_MESSAGES } from '@/lib/constants';

export default function DongLoading() {
  return <Loading message={LOADING_MESSAGES.DONG_LIST} />;
}