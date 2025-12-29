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

// Interface matching your Backend JSON structure
export interface Transaction {
  date: string;
  narrative?: string;   // Backend sends 'narrative'
  description?: string; // Frontend might expect 'description'
  type: "CREDIT" | "DEBIT" | "credit" | "debit";
  amount: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const TransactionTable = ({ transactions = [] }: TransactionTableProps) => {
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
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction, index) => {
                  // Normalize type to handle case sensitivity (CREDIT vs credit)
                  const isCredit = transaction.type.toUpperCase() === "CREDIT";

                  return (
                    <TableRow
                      key={index}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <TableCell className="font-medium text-muted-foreground">
                        {transaction.date}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {/* Fallback for narrative vs description */}
                        {transaction.narrative || transaction.description}
                      </TableCell>
                      <TableCell>
                        {isCredit ? (
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
                        className={`text-right font-semibold ${isCredit ? "text-success" : "text-destructive"
                          }`}
                      >
                        {isCredit ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary footer */}
        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            Showing {transactions.length} transactions
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