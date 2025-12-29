import { FileCheck, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  date: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
}

const transactions: Transaction[] = [
  {
    date: "Dec 28, 2025",
    description: "Payment from Reliance Industries",
    type: "credit",
    amount: 245000,
  },
  {
    date: "Dec 26, 2025",
    description: "GST Payment - Q3 2025",
    type: "debit",
    amount: 42500,
  },
  {
    date: "Dec 24, 2025",
    description: "Inventory Purchase - Raw Materials",
    type: "debit",
    amount: 156000,
  },
  {
    date: "Dec 22, 2025",
    description: "Payment from Tata Steel Ltd",
    type: "credit",
    amount: 380000,
  },
  {
    date: "Dec 20, 2025",
    description: "Staff Salary - December",
    type: "debit",
    amount: 175000,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const TransactionTable = () => {
  return (
    <Card className="card-shadow-lg border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <FileCheck className="h-4 w-4 text-accent" />
          </div>
          Verified Bank Statement Data
          <Badge variant="secondary" className="ml-2 font-normal">
            Last 30 Days
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">Date</TableHead>
                <TableHead className="font-semibold text-foreground">Description</TableHead>
                <TableHead className="font-semibold text-foreground">Type</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    {transaction.type === "credit" ? (
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                          <ArrowDownLeft className="h-3 w-3 text-success" />
                        </div>
                        <span className="text-sm font-medium text-success">Credit</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10">
                          <ArrowUpRight className="h-3 w-3 text-destructive" />
                        </div>
                        <span className="text-sm font-medium text-destructive">Debit</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      transaction.type === "credit"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Summary footer */}
        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            Showing 5 of 47 transactions
          </span>
          <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
            View all transactions →
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
