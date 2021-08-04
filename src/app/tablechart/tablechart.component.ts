import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CubejsClient } from "@cubejs-client/ngx";
import { Subject } from "rxjs";
import * as moment from "moment";
import chartDataLabels from 'chartjs-plugin-datalabels'
import { TableComponent } from 'smart-webcomponents-angular/table';

@Component({
  selector: 'app-tablechart',
  templateUrl: './tablechart.component.html',
  styles: [
  ]
})
export class TablechartComponent implements OnInit {

  @ViewChild('table', { read: TableComponent, static: false }) table!: TableComponent;
  sorting = {
    enabled: true,
    mode: 'one'
  }

  filtering: {
    enabled: true,
    filterRow: {
      visible: true
    }
  }
  Year: any = "";
  Month: any = "";
  @Input() chartType;
  @Input() query1;
  @Input() title;
  chartLabels1: any;
  label: any = chartDataLabels;
  piedata: any;
  pielabel: any;
  chartData2: any;
  showChart: boolean;
  pielabel1: any;
  piedata1: any;
  arryobj: {};
  enumMonth = { "-1": "January", "-2": "February", "-3": "March", "-4": "April", "-5": "May", "-6": "June", "-7": "July", "-8": "August", "-9": "September", "-10": "October", "-11": "November", "-12": "December" }
  projectCount: number;
  constructor(private cubejs: CubejsClient) { }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }x
  public chartData;
  chartData1;
  public chartLabels = [];
  public chartOptions: any = {
    legend: {
      position: "bottom",
      align: "center",
    },
    title: {
      text: 'SA Taxi Charts.',
      display: true,
      fontSize: 40,
      fontStyle: 'bold',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    responsive: true,
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        formatter: Math.round,
      },
    },
  };
  public PieOptions: any = {
    legend: {
      position: "left",
      align: "start",
      display: false,
      labels: {
        fontcolor: 'green'
      }
    },
    title: {
      text: 'SA Taxi Charts.',
      display: true,
      fontSize: 40,
      fontStyle: 'bold',

    },

    elements: {
      line: {
        fill: false,
      },
    },

    responsive: true,
    //maintainAspectRatio: false,
    plugins: {
      datalabels: {
        align: 'center',
        anchor: 'end',
        formatter: Math.round,
      },
    },
  };
  Details: any;
  public chartColors: any = [
    {
      borderColor: "#4D5360",
      backgroundColor: "#949FB1"
    }
  ];
  public chartColors1: any = [
    {
      borderColor: "white",
      backgroundColor: "#949FB1"
    }
  ];

  private querySubject;
  ready = false;
  total: any;
  Finalcount: any;
  MonthCount: any;
  page: number = 1;
  ArrayData: any;
  chartType1 = 'line'
  chartType2 = 'pie'
  chartType3 = 'doughnut'
  Year1: any = '2020-21:'
  Month1: any;
  private dateFormatter = ({ y }) => moment(y);

  //Transform data for visualization
  commonSetup(resultSet) {

    this.chartData = resultSet.seriesNames().map(({ key, title }) => ({
      data: resultSet.backwardCompatibleData[0],
      label: title

    }));

    this.chartLabels.length = 0;
    for (let i = resultSet.backwardCompatibleData[0].length - 1; i >= 0; i--) {
      this.chartLabels.push(resultSet.backwardCompatibleData[0][i]["TimesheetData.projectname"]);
    }
    this.Details = this.chartData[0].data;
    this.total = this.Details.reduce((sum: any, item: { [x: string]: any; }) => sum + item["TimesheetData.IntEquivalent"], 0);
    this.MonthCount = Object.keys(this.Details).length
    this.projectCount = [...new Set(this.Details.map(item => item["TimesheetData.projectname"]))].length
    this.Finalcount = this.MonthCount;
    
    this.chartData1 =this.getChartData(resultSet)
    this.chartLabels1 = resultSet.chartPivot().map((row) => row.x);
    this.chartLabels = this.chartLabels1
    this.piedata = resultSet.series().map((item) => {
      return {
        label: item.title,
        data: item.series.map(({ value }) => value),
        stack: 'a',
      };
    });

    this.piedata1 = this.piedata
    this.pielabel = resultSet.chartPivot().map((row) => row.x);

    this.pielabel1 = this.pielabel

    this.arryobj = {}
    this.pielabel.forEach((keyname, index) => {
      this.piedata[0].data.forEach((value, index1) => {
        if (index == index1)
          this.arryobj[keyname] = value;
      });
    });
  }
  private numberFormatter = x => x.toLocaleString();
  resultChanged(resultSet) {
    this.commonSetup(resultSet);

    if (this.chartType === "singleValue") {
      this.chartData = this.numberFormatter(
        resultSet.chartPivot()[0][resultSet.seriesNames()[0].key]
      );
    }
    this.ready = true;
  }
  ngOnInit(): void {

    this.showChart = this.chartType !== "singleValue";
    this.querySubject = new Subject();

    this.resultChanged = this.resultChanged.bind(this);
    this.cubejs
      .watch(this.querySubject)
      .subscribe(this.resultChanged, (err) => console.log("HTTP Error", err));

    this.querySubject.next(this.query1);

  }

  getChartData(resultSet){
    return resultSet.series().map((item) => {
      return {
        label: item.title,
        data: item.series.map(({ value }) => value),
        stack: 'a',
      };
    });
  }
  Search() {

    this.Year1 = this.Year;
    this.Month1 = this.Month == "" ? "" : this.enumMonth[this.Month] + " ";
    if (this.Year == "" && this.Month == "") {
      this.ready = false;
      this.Year1 = '2020-21:';
      this.resultChanged = this.resultChanged.bind(this);
    }
    else {
      {
        if (this.Year == "") {
          this.Year1 = ' 2020-21';
          this.Month1 = this.enumMonth[this.Month];
        }
        
        this.Details = this.chartData[0].data.filter((res: any) => {
          return res["TimesheetData.monthyear"].toLocaleLowerCase().match(this.Year.toLocaleLowerCase());
        })
        this.total = this.Details.reduce((sum, item) => sum + item["TimesheetData.IntEquivalent"], 0);
        this.MonthCount = Object.keys(this.Details).length

        this.chartLabels = this.chartLabels1.filter((res: any) => {
          return res.toLocaleLowerCase().match(this.Year.toLocaleLowerCase());
        })
        // console.log(this.chartLabels, this.chartData1)
        var globalData = []
        this.pielabel1 = this.pielabel.filter((res: any) => {
          return res.toLocaleLowerCase().match(this.Year.toLocaleLowerCase());
        })

        for (var key of Object.keys(this.arryobj)) {
          this.pielabel1.forEach(element => {
            if (element == key) {
              globalData.push(this.arryobj[key])
            }
          });
        }
        this.piedata1[0].data = globalData;
        
        //Filter for month.
        this.Details = this.Details.filter((res: any) => {
          return res["TimesheetData.monthyear"].toLocaleLowerCase().match(this.Month.toLocaleLowerCase());
        })
        this.total = this.Details.reduce((sum, item) => sum + item["TimesheetData.IntEquivalent"], 0);
        this.MonthCount = Object.keys(this.Details).length
        this.projectCount = [...new Set(this.Details.map(item => item["TimesheetData.projectname"]))].length
        this.chartLabels = this.chartLabels.filter((res: any) => {
          return res.toLocaleLowerCase().match(this.Month.toLocaleLowerCase());
        })
        
        var globalData = []
        this.pielabel1 = this.pielabel1.filter((res: any) => {
          return res.toLocaleLowerCase().match(this.Month.toLocaleLowerCase());
        })

        for (var key of Object.keys(this.arryobj)) {
          this.pielabel1.forEach(element => {
            if (element == key) {
              globalData.push(this.arryobj[key])
            }
          });
        }
        this.piedata1[0].data = globalData;
      }
    }
  }
  key: string;
  reverse: boolean = false;
  sortTable(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  roundoff(val: any) {
    return Math.round(val * 100) / 100;
  }

  string(val: any) {
    return val.toString();
  }
}