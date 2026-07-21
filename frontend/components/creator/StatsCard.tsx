import { ReactNode } from "react";

interface Props {

    title: string;

    value: string;

    icon: ReactNode;

}

export default function StatsCard({

    title,

    value,

    icon,

}: Props) {

    return (

        <div className="card bg-base-100 border shadow-sm">

            <div className="card-body">

                <div className="flex justify-between">

                    <div>

                        <p className="opacity-60">

                            {title}

                        </p>

                        <h2 className="text-3xl font-bold mt-2">

                            {value}

                        </h2>

                    </div>

                    <div className="rounded-xl bg-primary/10 p-3">

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );
}