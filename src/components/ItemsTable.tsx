import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Item {
  category: { name: string };
  product: { name: string };
  measurement: { name: string };
  quantity: number;
  price: number;
  cost: number;
  description: string;
  publishedMonth: { name: string };
  guaranteeTerm: number;
  guaranteeTermType: { name: string };
  deliveryTerm: string;
}

interface ItemsTableProps {
  items: Item[];
}

export const ItemsTable = ({ items }: ItemsTableProps) => {
  return (
    <div className="w-full overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="text-right font-semibold">Quantity</TableHead>
            <TableHead className="text-right font-semibold">Unit</TableHead>
            <TableHead className="text-right font-semibold">Price</TableHead>
            <TableHead className="text-right font-semibold">Total Cost</TableHead>
            <TableHead className="font-semibold">Guarantee</TableHead>
            <TableHead className="font-semibold">Delivery</TableHead>
            <TableHead className="font-semibold">Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index} className="hover:bg-muted/30">
              <TableCell>
                <Badge variant="outline">{item.category.name}</Badge>
              </TableCell>
              <TableCell className="font-medium">{item.product.name}</TableCell>
              <TableCell className="max-w-xs">
                <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
              </TableCell>
              <TableCell className="text-right font-semibold">{item.quantity}</TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {item.measurement.name}
              </TableCell>
              <TableCell className="text-right font-medium">
                {item.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-bold text-primary">
                {item.cost.toLocaleString()}
              </TableCell>
              <TableCell className="text-sm">
                {item.guaranteeTerm} {item.guaranteeTermType.name}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{item.deliveryTerm}</TableCell>
              <TableCell className="text-sm">{item.publishedMonth.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
