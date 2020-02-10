import { Component, OnInit } from "@angular/core";
import { MarketService } from "../market.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-market-table",
  templateUrl: "./market-table.component.html",
  styleUrls: ["./market-table.component.scss"]
})
export class MarketTableComponent implements OnInit {
  marketData;
  rows;
  headerRows;

  constructor(
    private marketService: MarketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    this.marketService.getMarkets().subscribe(
      data => {
        this.marketData = data;
        this.rows = this.processData(data["data"]);
        this.headerRows = this.rows[0];
        this.rows.splice(0, 1);
        this.toastr.success("Market data loaded.", "Success");
      },
      error => {
        this.toastr.error(error.message, "Error");
      }
    );
  }

  processData(data) {
    const highestRow = data.sort((a, b) => b.row - a.row)[0].row;

    const newRows = [];
    for (let i = 0; i < highestRow; i++) {
      const columns = data.filter(data => data.row === i);
      newRows.push({ columns });
    }
    return newRows;
  }
}
