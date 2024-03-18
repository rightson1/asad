import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export const Best_Sellers = () => {
  return (
    <section className="w-full bg-white pxs py-20">
      <h3 className="h3 py-5">Best Lenders</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {Array(4)
          .fill(0)
          .map((product) => (
            <Card
              className="py-4 bg-transparent"
              key={product.name}
              //   as={Link}
              //   href={`/categories/${product.slug}`}
            >
              <CardContent className=" py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl h-[150px]"
                  src={`/turf_second.png`}
                  width={270}
                  height={270}
                />
              </CardContent>
              <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{`Kinyanjui`}</h4>
                <p>
                  <span className="font-bold">Location:</span> Nairobi
                </p>
              </CardFooter>
            </Card>
          ))}
      </div>
    </section>
  );
};
