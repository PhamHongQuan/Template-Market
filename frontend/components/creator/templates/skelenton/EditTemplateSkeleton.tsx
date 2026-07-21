export default function EditTemplateSkeleton() {
    return (
        <main className="max-w-4xl mx-auto p-4 md:p-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-base-300" />

                <div className="space-y-2">
                    <div className="h-8 w-64 rounded bg-base-300" />
                    <div className="h-4 w-80 rounded bg-base-300" />
                </div>
            </div>

            <div className="space-y-8">
                {/* Basic Information */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body gap-5">
                        <div className="h-6 w-52 rounded bg-base-300" />

                        <div className="space-y-2">
                            <div className="h-4 w-20 rounded bg-base-300" />
                            <div className="h-12 rounded bg-base-300" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded bg-base-300" />
                            <div className="h-32 rounded bg-base-300" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-20 rounded bg-base-300" />
                                    <div className="h-12 rounded bg-base-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <div className="h-6 w-32 rounded bg-base-300 mb-5" />

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="aspect-video w-full md:w-64 rounded-xl bg-base-300" />
                            <div className="flex-1 h-40 rounded-xl bg-base-300" />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <div className="h-6 w-40 rounded bg-base-300 mb-5" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-video rounded-lg bg-base-300"
                                />
                            ))}
                        </div>

                        <div className="h-36 rounded-xl bg-base-300" />
                    </div>
                </div>

                {/* Source */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <div className="h-6 w-40 rounded bg-base-300 mb-5" />

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-64 h-24 rounded-xl bg-base-300" />
                            <div className="flex-1 h-36 rounded-xl bg-base-300" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <div className="h-12 w-32 rounded bg-base-300" />
                    <div className="h-12 w-32 rounded bg-base-300" />
                </div>
            </div>
        </main>
    );
}