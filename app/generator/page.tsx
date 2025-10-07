import { getAllSchemas } from '@/lib/schemas';
import { GeneratorView } from './generator-view';

export default function GeneratorPage() {
  const allSchemas = getAllSchemas();

  return <GeneratorView allSchemas={allSchemas} />;
}
