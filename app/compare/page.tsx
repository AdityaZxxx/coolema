import { getAllSchemas } from '@/lib/schemas';
import { CompareView } from './compare-view';

export default function ComparePage() {
  const allSchemas = getAllSchemas();

  return <CompareView allSchemas={allSchemas} />;
}
