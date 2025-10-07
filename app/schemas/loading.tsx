export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#64ffda] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-[#a0aec0]">Loading schemas...</p>
      </div>
    </div>
  );
}
