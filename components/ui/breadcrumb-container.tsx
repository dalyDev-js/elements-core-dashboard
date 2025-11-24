"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

const BreadcrumbContainer = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (segments.length === 0) return null;

  const lastSegment = segments[segments.length - 1];
  const parentSegments = segments.slice(0, -1);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parentSegments.length > 0 && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={`/${parentSegments.join("/")}`}>
                {formatSegment(parentSegments[parentSegments.length - 1])}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{formatSegment(lastSegment)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbContainer;
