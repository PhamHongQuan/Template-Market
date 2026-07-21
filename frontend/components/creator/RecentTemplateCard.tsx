interface Props {

    title: string;

    category: string;

    thumbnail: string;

    downloads: number;

    views: number;

}

export default function RecentTemplateCard({

    title,

    category,

    thumbnail,

    downloads,

    views,

}: Props) {

    return (

        <div className="card bg-base-100 border shadow-sm">

            <figure>

                <img
                    src={thumbnail}
                    alt={title}
                />

            </figure>

            <div className="card-body">

                <div className="badge badge-outline">

                    {category}

                </div>

                <h2 className="card-title">

                    {title}

                </h2>

                <div className="flex gap-5 text-sm opacity-60">

                    <span>

                        👁 {views}

                    </span>

                    <span>

                        ⬇ {downloads}

                    </span>

                </div>

                <div className="card-actions justify-end">

                    <button className="btn btn-outline btn-sm">

                        Edit

                    </button>

                    <button className="btn btn-primary btn-sm">

                        View

                    </button>

                </div>

            </div>

        </div>

    );
}