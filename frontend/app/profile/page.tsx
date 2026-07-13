export default function ProfilePage() {
    return (
        <>
            <h1 className="text-4xl font-bold">
                Overview
            </h1>

            <p className="mt-2 opacity-70">
                Welcome back 👋
            </p>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

                <div className="stats shadow bg-base-200">

                    <div className="stat">
                        <div className="stat-title">
                            Purchased
                        </div>

                        <div className="stat-value">
                            12
                        </div>
                    </div>

                </div>

                <div className="stats shadow bg-base-200">

                    <div className="stat">
                        <div className="stat-title">
                            Downloads
                        </div>

                        <div className="stat-value">
                            52
                        </div>
                    </div>

                </div>

                <div className="stats shadow bg-base-200">

                    <div className="stat">
                        <div className="stat-title">
                            Wishlist
                        </div>

                        <div className="stat-value">
                            9
                        </div>
                    </div>

                </div>

                <div className="stats shadow bg-base-200">

                    <div className="stat">
                        <div className="stat-title">
                            Reviews
                        </div>

                        <div className="stat-value">
                            16
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}