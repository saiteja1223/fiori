sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("project1.controller.View1", {

    onInit() {
      this._excelData = []; // Store JSON here
    },

    // STEP 1: File Picker
    onSelectExcel() {
        debugger
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx";

      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
          sap.m.MessageToast.show("No file selected");
          return;
        }

        try {
          const json = await this._excelToJson(file);
          this._excelData = json;

          sap.m.MessageToast.show("Excel converted to JSON");

          console.log("JSON DATA:", json);

        } catch (err) {
          console.error(err);
          sap.m.MessageToast.show("Error reading Excel");
        }
      };

      input.click();
    },

    // STEP 2: Convert Excel → JSON
    _excelToJson(file) {
           
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            /* global XLSX */
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const firstSheet = workbook.SheetNames[0];
            const sheet = workbook.Sheets[firstSheet];

            const json = XLSX.utils.sheet_to_json(sheet, {
              defval: "" // fill empty cells
            });

            resolve(json);

          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = reject;

        reader.readAsBinaryString(file);
      });
    },

    // STEP 3: Send JSON to Backend OData POST
    onSendJson() {
      if (this._excelData.length === 0) {
        sap.m.MessageToast.show("Upload Excel first");
        return;
      }

      const payload = {
        ExcelJson: JSON.stringify(this._excelData) // send JSON as string
      };
        console.log(payload)
      const oModel = this.getOwnerComponent().getModel();

      oModel.create("/ExcelJsonSet", payload, {
        success: () => {
          sap.m.MessageToast.show("JSON sent successfully");
        },
        error: (err) => {
          console.error(err);
          sap.m.MessageToast.show("Failed to send JSON");
        }
      });
    }

  });
});
