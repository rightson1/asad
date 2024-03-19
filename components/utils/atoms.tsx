import { CiHome } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type BreadcrumbProps = {
  items: {
    label: string;
    href: string;
  }[];
};
export const CustomBredcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="items-c">
      <CiHome />
      <FaAngleRight />
      {items.map((item, index) => (
        <div key={index} className="items-c">
          <span>{item.label}</span>
          {index !== items.length - 1 && <FaAngleRight />}
        </div>
      ))}
    </div>
  );
};
