import Link from "next/link";

export default function EmptyState() {

    return (

        <div className="hero bg-base-100 rounded-xl border">

            <div className="hero-content text-center">

                <div>

                    <h2 className="text-2xl font-bold">

                        No templates yet

                    </h2>

                    <p className="opacity-60 mt-2">

                        Start selling your first template.

                    </p>

                    <Link
                        href="/creator/upload"
                        className="btn btn-primary mt-6"
                    >

                        Upload Template

                    </Link>

                </div>

            </div>

        </div>

    );
}