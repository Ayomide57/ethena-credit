/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { ethenaContract, withdrawCollateral } from "@/util";
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
import { useActiveAccount } from "thirdweb/react";

export type Collateral = {
  id: any;
  borrower: string;
  amount: BigNumberish;
  active_loan: boolean;
  existed: boolean;
  withdraw: boolean;
};

const InnerCell = ({ row }: any) => {
  const smartAccount = useActiveAccount();
  const handleWithDrawCollateral = () => {
    setTimeout(async () => {
      const account = smartAccount ? smartAccount : undefined;
      const collateral_id = row.original.id;
      const response: any = await withdrawCollateral(account, collateral_id);
      console.log(response);

      //if (response) toast.success(response);
    }, 400);
  };

  return (
    <div className="capitalize">
      {!row.getValue("withdraw") ? (
        "Yes"
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleWithDrawCollateral}
          className="border-primary"
        >
          withdraw
        </Button>
      )}
    </div>
  );
};


const columns: ColumnDef<Collateral>[] = [
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
    accessorKey: "withdraw",
    header: "Withdraw Collateral",
    cell: ({ row }) => <InnerCell row={row} />,
  },
  {
    accessorKey: "active_loan",
    header: "Loan Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("active_loan") ? "Yes" : "No"}
      </div>
    ),
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
            className="border backdrop-blur-xl bg-sky-700/30 border-primary"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${request.id}`)}
            >
              Copy Collateral ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/loans/request-loan/${request.id}`}>
                Request For Loan
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/collateral/collateral-detail/${request.id}`}
              >
                View collateral details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Collaterals = () => {

  const [data, setProperties] = useState<any>([]);

  const queryRwaEvents = React.useCallback(async () => {
    const events = await ethenaContract.queryFilter("collateralEvent");
    const filterVal: Collateral[] = [];
    events.map(
      (event: any) => {
        return (
          event.args &&
          filterVal.push({
            id: event.args.collateral_id,
            borrower: event.args.borrower,
            amount: event.args.amount,
            active_loan: event.args.active_loan,
            existed: event.args.existed,
            withdraw: true,
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
      className="ml-10 mr-10 text-white"
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="flex justify-between">
        <h1 className="p-4 text-3xl">Collaterals</h1>
        <Link
          href="/dashboard/collateral/add-collateral"
          className="p-2 text-1xl border border-primary rounded-lg h-11"
        >
          Add Collateral
        </Link>
      </div>

      <div
        //className={styles.content}
        style={{ width: "-webkit-fill-available" }}
      >
        <div className="mx-auto">
          <div className="p-4">
            <h1 className="">All collateral</h1>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaterals;
