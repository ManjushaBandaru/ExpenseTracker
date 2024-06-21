import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  data: any;
  options: any;
  example: any[] = [];
  date1: Date | undefined;
  date2: Date | undefined;

  constructor() {
    this.example = [];
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 15] // Example data for each month
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90, 70, 50, 35, 25, 45] // Example data for each month
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  exportPdf() {
    import('jspdf').then((module) => {
      const jsPDF = module.default;

      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF();
        const data: any[][] = this.example.map((example: any) => [
          // Example mapping logic if needed
        ]);

        doc.save('example.pdf');
      });
    });
  }

  exportExcel() {
    if (!this.example || this.example.length === 0) {
      console.error('No data available to export.');
      return;
    }

    try {
      const data: any[] = this.example.map((example: any) => ({
        // Example mapping logic if needed
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([excelBuffer]), 'example.xlsx'); // Use saveAs from file-saver

    } catch (error) {
      console.error('Error exporting data to Excel:', error);
    }
  }
}
