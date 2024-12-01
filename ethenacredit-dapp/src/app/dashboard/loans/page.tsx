/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { ethenaContract } from "@/util";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BigNumberish } from "ethers";
import Link from "next/link";
import { withdrawLoan, updatePrice } from "@/util";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";


export type Loan = {
  id: any;
  repaid: boolean;
  loan_disbursed: boolean;
  borrower: string;
  amount: BigNumberish;
  duration: BigNumberish;
  due_date: BigNumberish;
  total_amount_paid: BigNumberish;
  collateral_id: BigNumberish;
};

const InnerCell = ({ row }: any) => {
  const smartAccount = useActiveAccount();
  const handleWithDrawLoan = () => {
    setTimeout(async () => {
      const account = smartAccount ? smartAccount : undefined;
      const loan_id = row.original.id;
      const collateral_id = row.original.collateral_id;
      const amount = Number(row.original.amount) / 1000000000000000000;
      const response: any = await withdrawLoan(account, amount, loan_id, collateral_id);
      /**const response: any = await updatePrice(
        account,
        amount
      );**/
      console.log(response);

      //if (response) toast.success(response);
    }, 400);
  };

      return (
        <div className="capitalize">
          {row.getValue("loan_disbursed") ? (
            "Yes"
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleWithDrawLoan}
              className="border-primary"
            >
              dusburse
            </Button>
          )}
        </div>
      );
}

const columns: ColumnDef<Loan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "borrower",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        onClick={() =>
          navigator.clipboard.writeText(`${row.getValue("borrower")}`)
        }
        className="cursor-pointer px-4 lowercase"
      >
        {row.getValue("borrower")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">USDe Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {`${Number(row.getValue("amount")) / 1000000000000000000}`}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: () => <div className="text-right">Duration</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {`${row.getValue("duration")} days`}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: () => <div className="text-right">Due Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {`${row.getValue("due_date")}`}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "total_amount_paid",
    header: () => <div className="text-right">Amount Paid</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {`${row.getValue("total_amount_paid")}`}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "repaid",
    header: "Repaid",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("repaid") ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "loan_disbursed",
    header: "Disbursed",
    cell: ({ row }) => <InnerCell row={row} />,
  },
  //end
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const request = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border border-primary bg-sky-700/80 backdrop-blur-xl text-white"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${request.id}`)}
            >
              Copy Loan ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/dashboard/collateral/collateral-detail/${request.id}`}
              >
                View loan details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/loans/loan-payment-history/${request.id}`}
              >
                Loan Payment History
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/dashboard/loans/pay-loan/${request.id}`}>
                Pay Loan
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Loans = () => {
  const [data, setProperties] = useState<any>([]);
    const smartAccount = useActiveAccount();

    const handleWithDrawLoan = () => {
      setTimeout(async () => {
        const account = smartAccount ? smartAccount : undefined;
        //const loan_id = row.original.id;
        //const collateral_id = row.original.collateral_id;
        const amount = Number(15);
        //const response: any = await withdrawLoan(account, amount, loan_id, collateral_id);
        const response: any = await updatePrice(account, amount);
        console.log(response);

        if (response) toast.success(response);
      }, 400);
    };

  const queryRwaEvents = React.useCallback(async () => {
    const events = await ethenaContract.queryFilter("loanRequestEvent");
    const filterVal: Loan[] = [];
    events.map(
      (event: any) => {
        return (
          event.args &&
          filterVal.push({
            id: event.args.loan_id,
            repaid: event.args.repaid,
            loan_disbursed: event.args.loan_disbursed,
            borrower: event.args.borrower,
            amount: event.args.amount,
            duration: event.args.duration,
            due_date: event.args.due_date,
            total_amount_paid: event.args.total_amount_paid,
            collateral_id: event.args.collateral_id,
          })
        );
      }
    );
    setProperties(filterVal);
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    queryRwaEvents();
  }, [data, queryRwaEvents]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div
      className="ml-10 text-white"
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="flex justify-between">
        <h1 className="p-4 text-3xl">Loans</h1>
      </div>
      <div
        //className={styles.content}
        style={{ width: "-webkit-fill-available" }}
      >
        <div className="mx-auto">
          <div className="p-4">
            <h1 className="">All Loans</h1>
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter owner ..."
                value={
                  (table.getColumn("borrower")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("borrower")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm border-primary"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto rounded-sm border-primary"
                  >
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border border-primary bg-sky-700/30 backdrop-blur-xl"
                >
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border-primary">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-muted-foreground flex-1 text-sm">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="border-primary"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="border-primary"
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWithDrawLoan}
                  //disabled={!table.getCanNextPage()}
                  className="border-primary"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
