export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-white/20 rounded w-1/3 mx-auto"/>
        <div className="h-4 bg-white/20 rounded w-2/3 mx-auto"/>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/10 p-6 rounded-2xl">
              <div className="h-6 bg-white/20 rounded w-1/4 mb-4"/>
              <div className="h-4 bg-white/20 rounded w-3/4 mb-4"/>
              <div className="h-4 bg-white/20 rounded w-1/2"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 