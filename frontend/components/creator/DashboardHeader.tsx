import Link from "next/link";

export default function DashboardHeader() {

    return (

        <div className="flex justify-between items-center">

            <div>

                <h1 className="text-3xl font-bold">

                    Dashboard

                </h1>

                <p className="text-base-content/60">

                    Manage your templates.

                </p>

            </div>

            <Link
                href="/creator/upload"
                className="btn btn-primary"
            >
                Upload Template
            </Link>

        </div>

    );
}