import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
 
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent  {
  date1: Date | undefined;
  date2: Date | undefined;
  datePipe: any;
  selectedYear: any;
  year: any;
  alertMessage: any;
  holidays: any;
  // carryForwardAmount: number = 0;
  // totalAmount: number = 0;
  // reports: any[] = [];

  // currentMonth = new Date().toLocaleString('default', { month: 'long' });
  // currentYear = new Date().getFullYear();

  // ngOnInit() {
  //   this.calculateAmounts(); 
  // }

  // calculateAmounts() {
  //   this.carryForwardAmount = this.reports.reduce((sum, item) => sum + item.CarryForwardAmount, 0);
  //   this.totalAmount = this.reports.reduce((sum, item) => sum + item.Amount, 0);
  // }

  // clear(table: any) {
  // }

  // onAdd() {
  // }

  constructor() {
    // (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  
  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
  async pdfHeader() {
    try {
      const headerImage1 = await this.getBase64ImageFromURL('assets/layout/images/Calibrage_logo1.png');
      const headerImage2 = await this.getBase64ImageFromURL('assets/layout/images/head_right.PNG');
      const pageWidth = 841.89;
      const imageWidth = (pageWidth / 4) - 10;

      let row = {
        columns: [
          {
            image: headerImage1,
            width: imageWidth,
            alignment: 'left',
            margin: [0, 0, 0, 0] 
          },
          {
            width: '*',
            text: '', 
            alignment: 'center' 
          },
          {
            image: headerImage2,
            width: imageWidth,
            alignment: 'right',
            margin: [0, 0, 0, 0] 
          }
        ],
        alignment: 'justify',
        margin: [0, 0, 0, 0] 
      };

      let rowHeader = {
        columns: [
          { text: 'Holidays for ' + this.selectedYear.year, style: 'header', alignment: 'center', margin: [0, 0, 0, 10] },
        ],
        style: 'header',
        margin: [0, 0, 0, 0]
      };
      const content = [row, rowHeader]; 
      return content;
    } catch (error) {
      console.error("Error occurred while formatting key and values:", error);
      throw error; 
    }
  }
  async exportPdf() {
    const pageSize = { width: 595.28, height: 841.89 };
    const headerImage = await this.pdfHeader();
    const waterMark = await this.getBase64ImageFromURL('assets/layout/images/transparent_logo.png');
    const holidaysContent = await this.generateHolidaysContent();
    const createFooter = (currentPage: number) => {
      let signatures = {
        columns: [
          {
            width: 'auto',
            stack: [
              { text: 'HR Manager', alignment: 'center' },
              { text: '\nNikhitha Yathamshetty', alignment: 'center' }
            ]
          },
          { width: '*', text: '', alignment: 'center' },
          {
            width: 'auto',
            stack: [
              { text: 'CEO', alignment: 'center' },
              { text: '\nM V Srinivasa Rao', alignment: 'center', margin: [-4, 0, 0, 0] }
            ]
          }
        ], margin: [20, 4, 20, 4]
      };
      let createFooter = {
        margin: [0, 0, 0, 0],
        height: 20,
        background: '#ff810e',
        width: 595.28,
        columns: [
          { canvas: [{ type: 'rect', x: 0, y: 0, w: 530.28, h: 20, color: '#ff810e' }] },
          {
            stack: [
              {
                text: `Copyrights © ${this.year} Calibrage Info Systems Pvt Ltd.`,
                fontSize: 11, color: '#fff', absolutePosition: { x: 20, y: 54 }
              },
              {
                text: `Page ${currentPage}`,
                color: '#000000', background: '#fff', fontSize: 12, absolutePosition: { x: 540, y: 52 },
              }
            ],
          }
        ],
      }

      const footer = [signatures, createFooter]
      return footer;
    }

    const docDefinition = {
      header: () => (headerImage),
      footer: (currentPage: number) => createFooter(currentPage),
      background: [{
        image: waterMark,
        absolutePosition: { x: (pageSize.width - 200) / 2, y: (pageSize.height - 200) / 2 },
      }],
      content: [
        holidaysContent
      ],
      pageMargins: [40, 110, 40, 70.5],
      styles: {
        header: { fontSize: 19 },
        tableheader: { fontSize: 12, alignment: 'center', fillColor: '#dbdbdb' },
        tabledata: { alignment: 'center', fontSize: 10 },
        defaultStyle: { font: 'Typography', fontSize: 10 },
      },
    };

    if (this.holidays.length !== 0) {
      const pdfName = `Holidays Report ${DateTimeFormatter()}.pdf`;
      // pdfMake.createPdf(docDefinition).download(pdfName);
    }
    else
      this.alertMessage.displayInfo(`There are no Holidays Report`);
  }

  async generateHolidaysContent() {
    const check = await this.getBase64ImageFromURL('assets/layout/images/check1.PNG');
    const cancle = await this.getBase64ImageFromURL('assets/layout/images/cancle1.PNG');
    const content = [
      [
        { text: 'S.No.', style: 'tableheader' },
        { text: 'Holiday Title', style: 'tableheader' },
        { text: 'From Date', style: 'tableheader' },
        { text: 'To Date', style: 'tableheader' },
        { text: 'Is Active', style: 'tableheader' },
      ],
      ...this.holidays.map((holiday: { title: any; fromDate: any; toDate: any; isActive: any; }, index: number) => [
        { text: (index + 1).toString(), style: 'tabledata' },
        { text: holiday.title || '', fontSize: 10 },
        { text: this.datePipe.transform(holiday.fromDate, DATE_OF_JOINING) || '', style: 'tabledata' },
        { text: this.datePipe.transform(holiday.toDate, DATE_OF_JOINING) ? this.datePipe.transform(holiday.toDate, DATE_OF_JOINING) : this.datePipe.transform(holiday.fromDate, DATE_OF_JOINING), style: 'tabledata' },
        { image: holiday.isActive ? check : cancle, width: 11, height: 11, style: 'tabledata' }
      ])
    ];
    const columnWidths = [50, 155, 110, 110, 50];
    return {
      table: {
        headerRows: 1,
        widths: columnWidths,
        body: content,
      },
    };
  }
}
function DateTimeFormatter() {
  throw new Error('Function not implemented.');
}

function DATE_OF_JOINING(fromDate: any, DATE_OF_JOINING: any) {
  throw new Error('Function not implemented.');
}

