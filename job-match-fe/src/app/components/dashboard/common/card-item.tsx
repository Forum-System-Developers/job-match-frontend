import Image, { StaticImageData } from "next/image";

export function CardItem({
  img,
  value,
  title,
  link = null,
}: {
  img: StaticImageData;
  value: string;
  title: string;
  link: string | null;
}) {
  return (
    <div className="col-lg-3 col-6">
      <a style={{ width: "100%", display: "block" }} href={link || ""}>
        <div className="dash-card-one bg-white border-30 position-relative mb-15">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
              <Image src={img} alt="icon" className="lazy-img" />
            </div>
            <div className="order-sm-0">
              <div className="value fw-500">{value}</div>
              <span>{title}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
