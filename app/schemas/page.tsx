import { getAllSchemas } from '@/lib/schemas';
import { SchemaList } from './schema-list';

export default function SchemasPage() {
  const allSchemas = getAllSchemas();

  return <SchemaList allSchemas={allSchemas} />;
}
