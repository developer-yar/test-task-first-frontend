import Link from "next/link";

export const CustomLink = ({
  href,
  text,
}: {
  href: string;
  text: string;
}): JSX.Element => (
  <Link className="atext-black hover:text-gray-600" href={href}>
    {text}
  </Link>
);
