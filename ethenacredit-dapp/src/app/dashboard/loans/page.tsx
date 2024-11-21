"use client";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import Link from "next/link";
//import { getLoanRequestList } from "@/util";
import { getAccount } from "@wagmi/core";
import { config } from "@/util/config";
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


const data: MyLoan[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    borrower: "ken99@yahoo.com",
    property_reg_id: 316,
    verification_status: "success",
    loan_amount_period: "6 months",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    borrower: "Abe45@gmail.com",
    property_reg_id: 316,
    verification_status: "success",
    loan_amount_period: "6 months",
  },
  {
    id: "derv1ws0",
    amount: 837,
    borrower: "Abe45@gmail.com",
    property_reg_id: 316,
    verification_status: "processing",
    loan_amount_period: "6 months",
  },
  {
    id: "5kma53ae",
    amount: 874,
    borrower: "Silas22@gmail.com",
    property_reg_id: 316,
    verification_status: "success",
    loan_amount_period: "6 months",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    borrower: "carmella@hotmail.com",
    property_reg_id: 316,
    verification_status: "failed",
    loan_amount_period: "6 months",
  },
];

export type MyLoan = {
  id: string;
  amount: number;
  borrower: string;
  property_reg_id: number;
  verification_status: "pending" | "processing" | "success" | "failed";
  loan_amount_period: string;
};

export const columns: ColumnDef<MyLoan>[] = [
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
    accessorKey: "verification_status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("verification_status")}</div>
    ),
  },
  {
    accessorKey: "borrower",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wallet Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase px-4">{row.getValue("borrower")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "property_reg_id",
    header: () => <div className="text-right">property Registration Id</div>,
    cell: ({ row }) => {
      //const property_reg_id = row.getValue("property_reg_id");

      return (
        <div className="text-right font-medium">
          {row.getValue("property_reg_id")}
        </div>
      );
    },
  },
  //start
  {
    accessorKey: "loan_amount_period",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loan Amount Period
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase px-4">{row.getValue("loan_amount_period")}</div>
    ),
  },
  //end
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const loan = row.original;

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
            className="border backdrop-blur-xl bg-sky-700/30 border-primary"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(loan.id)}
            >
              Copy Loan ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View loan details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


const Loan = () => {
  
  //const [requestData, setRequestData] = useState<Promise<unknown> | undefined>();
  const [account, setAccount] = useState<`0x${string}`>();

  const getLoanRequest = (
    values: {
      requestId: number;
    },
    setSubmitting: {
      (isSubmitting: boolean): void;
      (arg0: boolean): void;
    }
  ) => {
    setTimeout(async () => {
      /**if (account) {
        const response: Promise<unknown> = getLoanRequestList({
          address: account,
          requestId: values.requestId,
        });
        if(response)setRequestData(await response);
        console.log(response);
      }*/
      setSubmitting(false);
    }, 400);
  };

  useEffect(() => {
    const accountSource = getAccount(config);
    setAccount(accountSource?.address);
    //console.log(requestData);
  }, [account,
    //requestData
  ]);

      const [sorting, setSorting] = React.useState<SortingState>([]);
      const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
      const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
      const [rowSelection, setRowSelection] = React.useState({});

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
    <>
      <div className="container ml-20">
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="p-4 text-3xl">Loan Requests</h1>
          </div>
          <div className="p-8">
            {" "}
            <Link
              href="/dashboard/loans/request-loan"
              className="p-3 text-1xl border border-slate-400 rounded-lg"
            >
              Request Loan
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  requestId: 0,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  getLoanRequest(values, setSubmitting)
                }
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <CustomInput
                      placeholder="Loan Request Id"
                      name="requestId"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.requestId && touched.requestId && errors.requestId}
                    <CustomButton
                      value="Submit"
                      type={"button"}
                      style={{ float: "inline-end" }}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    />
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">View all your loan requests</h1>
              <div className="flex items-center py-4">
                <Input
                  placeholder="Filter borrower..."
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
                      className="ml-auto border-primary rounded-sm"
                    >
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border backdrop-blur-xl bg-sky-700/30 border-primary"
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
                <div className="flex-1 text-sm text-muted-foreground">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loan;
