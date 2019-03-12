/* eslint require-jsdoc: 0 */
window.defer.push(() => {
  window.NativeUtils.merge(window, window.NativeUtils);
  const w = window,
    flipAxis = (csv, delimiter = ",", linebreak = "\n") => {
      csv = csv.split(linebreak);
      csv.forEach((row, i) => {
        csv[i] = row.split(delimiter);
      });
      csv = w._.unzip(csv);
      csv.forEach((row, i) => {
        csv[i] = row.join(delimiter);
      });
      csv = csv.join(linebreak);

      return csv;
    },
    smartlink = str => {
      return w.marked(`<${str}>`).includes("<a href=") && str.includes("@")
        ? `<${str}>`
        : str;
    },
    drawReport = (F, opts) => {
      let outHTML = "",
        limit = 100,
        report = F.reportObj,
        reportG = F.reportGObj;

      limit = w.qs2obj.limit ? w.qs2obj.limit : limit;
      report = opts && opts.flip ? F.reportObjFlip : report;
      reportG = opts && opts.flip ? F.reportGObjFlip : reportG;

      outHTML += "<div>";
      outHTML += '<span class="data-meta">';
      outHTML += w.marked(`**${F.name}** <br> _containing **${
        reportG.length
      }** group(s)_
                from **${
                  reportG.length > 1
                    ? report.data.length - reportG.length
                    : report.data.length
                }** data.
            `);
      outHTML += "</span>";
      outHTML += `
<p></p>
<input id= 'swap_rows_cols_${w.md5(
        F.name
      )}' class='swap-rows-cols input-control' type='checkbox'
    data-report-id='${w.md5(F.name)}'
    ${opts && opts.flip ? 'checked="checked"' : ""}
    ${F.reportObjFlip ? "" : 'disabled="disabled"'}/>
<label for='swap_rows_cols_${w.md5(F.name)}' class='swap-rows-cols '>
    <span class='input-face'></span>
    <span> ${
      F.reportObjFlip ? "Swap" : "Can't swap"
    } the rows &amp; columns</span>
</label>

<p></p>
<input id= 'group_list_${w.md5(
        F.name
      )}' class='group-list-ctrl input-control' type='checkbox'/>
<label for='group_list_${w.md5(F.name)}' class='group-list-face'>
    <span class='input-face'></span>
    <span> Show 1st group only.</span>
</label>

<ul class='data-group-list'>
            `;

      /* GROUP */
      reportG.forEach((grp, gi) => {
        if (gi < limit) {
          outHTML += `
    <li class='group group-${gi}'>
    <span class='group-meta'><b><i>
        Group #${++grp.meta.id || 1} × ${grp.data.length} row(s)
    </i></b></span>
    <input id= 'group_${gi}_${w.md5(
            F.name
          )}' class='group-ctrl input-control' type='checkbox'/>
    <label for='group_${gi}_${w.md5(F.name)}' class='group-face'>
        <span> Show 1st row only.</span>
        <span class='input-face'></span>
    </label>
    <ul>
                    `;

          /* DATAROW */
          grp.data.forEach((obj, ri) => {
            if (ri < limit) {
              outHTML += `
        <li class='clearfix list list-${ri}'>
        <input id= 'list_${gi}_${ri}_${w.md5(
                F.name
              )}' class='list-ctrl input-control' type='checkbox'/>
        <label for='list_${gi}_${ri}_${w.md5(F.name)}' class='list-face'>
            <span class='input-face'></span>
        </label>
        <span class='data-list'>
                            `;
              outHTML += w.marked(
                `**_Row #${++ri} × ${Object.keys(obj).length} data(s)_**`
              );
              for (const key in obj) {
                if (w.Reflect.has(obj, key)) {
                  outHTML += w
                    .marked(`**${smartlink(key)}** : ${smartlink(obj[key])}`)
                    .split("href=")
                    .join('target="_blank" href=');
                }
              }
              outHTML += "</span></li>";
            }
          });
          outHTML += "</ul></li>";
        }
      });
      outHTML += "</ul></div>";

      return outHTML;
    },
    listener = () => {
      w.on(w.oneDOM("#full_container"), "change", () => {
        w.toggleClass(w.oneDOM(".container"), "full");
      });
      w.on(w.allDOM(".swap-rows-cols"), "change", e => {
        e = e.target || e.srcElement || e;
        let outHTML = e.checked ? { flip: true } : {};

        outHTML = drawReport(
          w.dz.files[w.dz.filenames[e.dataset.reportId]],
          outHTML
        );
        w.oneDOM(`#report_${e.dataset.reportId}`).innerHTML = outHTML;
        listener();
      });
    };

  w.processor = F => {
    try {
      if (w.dz.face.innerHTML.indexOf("</div>") < 0) {
        w.dz.face.innerHTML = "";
      }
      w.dz.face.innerHTML += `<div title="${F.name}"> • ${F.name}</div>`;

      const papaConfig = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      };
      let firstK = 0,
        gid = 0;

      F.reportObj = w.Papa.parse(F.dataTXT, papaConfig);
      [firstK] = F.reportObj.meta.fields;
      F.reportGObj = [];
      F.reportObj.data.forEach(rowCSV => {
        if (rowCSV[firstK] === "") {
          F.reportGObj.push({
            meta: {
              id: gid++
            },
            data: []
          });
        } else if (F.reportGObj.length > 0) {
          F.reportGObj[F.reportGObj.length - 1].data.push(rowCSV);
        }
      });
      F.reportGObj = F.reportGObj.length ? F.reportGObj : [F.reportObj];

      F.dataTXTFlip = flipAxis(
        F.dataTXT,
        F.reportObj.delimiter,
        F.reportObj.linebreak
      );

      F.reportObjFlip = w.Papa.parse(F.dataTXTFlip, papaConfig);
      if (
        w._.uniq(F.reportObjFlip.meta.fields).length ===
        F.reportObjFlip.meta.fields.length
      ) {
        [firstK] = F.reportObjFlip.meta.fields;
        gid = 0;
        F.reportGObjFlip = [];
        F.reportObjFlip.data.forEach(rowCSV => {
          if (rowCSV[firstK] === "") {
            F.reportGObjFlip.push({
              meta: {
                id: gid++
              },
              data: []
            });
          } else if (F.reportGObjFlip.length > 0) {
            F.reportGObjFlip[F.reportGObjFlip.length - 1].data.push(rowCSV);
          }
        });
        F.reportGObjFlip = F.reportGObjFlip.length
          ? F.reportGObjFlip
          : [F.reportObjFlip];
      } else {
        F.reportObjFlip = false;
        F.reportGObjFlip = false;
      }

      w.reportModal.close();
      w.removeClass(w.oneDOM(".step.hide"), "hide");

      w.dz.filenames = {};
      w.dz.files.forEach((file, index) => {
        w.dz.filenames[w.md5(file.name)] = index;
        if (w.oneDOM(`#report_${w.md5(file.name)}`)) {
          w.oneDOM(`#report_${w.md5(file.name)}`).innerHTML = drawReport(file);
        }
        w.oneDOM("#report").innerHTML += `<div id='report_${w.md5(
          F.name
        )}' class='report'>
                ${drawReport(file)}
                </div>`;
        listener();
      });
    } catch (error) {
      // console.warn(error)
      w.reportModal = new w.Modal(
        {
          id: "reportModal",
          header: "Error",
          body: `Close this modal to refresh this page<br><br><b>${error}</b>`
        },
        () => {
          String(w.location);
        }
      );
    }
  };

  w.dz = new w.DropZone(w.oneDOM("#dz_ctrl"), w.oneDOM("#dz_face"));
  w.on([w.dz.ctrl, w.dz.face], "drop dragover dragend dragleave change", e => {
    w.dz.fileHandler(
      (e => {
        e.preventDefault();
        if (e.type === "dragover") {
          w.addClass(w.dz.face, "hover");
        } else if (e.type === "dragend") {
          w.removeClass(w.dz.face, "hover");
        } else if (e.type === "dragleave") {
          w.removeClass(w.dz.face, "hover");
        } else if (e.type === "drop") {
          w.removeClass(w.dz.face, "hover");
        }

        return e;
      })(e),
      F => {
        w.dz.files.forEach(file => {
          if (file.name === F.name) {
            F.isDuplicate = true;
          }
        });
        if (F.isDuplicate) {
          F.modal = new w.Modal({
            header: "Duplicate",
            body: "Oh boy, there’s a duplicate file, try renaming first"
          });

          return false;
        }
        if (F.size > 10e6) {
          F.modal = new w.Modal({
            header: "File too big",
            body: "MAN~~ try smaller file; max 10MB, okay?"
          });

          return false;
        }
        if (
          F.type !== "text/csv" &&
          F.type !== "text/plain" &&
          F.type !== "application/vnd.ms-excel" &&
          F.type !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
          F.type !== ""
        ) {
          F.modal = new w.Modal({
            header: "Invalid file",
            body: "only accept CSV file, .txt based file"
          });

          return false;
        }
        w.reportModal = new w.Modal({
          id: "reportModal",
          className: "sticky loading",
          header: "Loading",
          body: `<div id="nprogress"><div class="spinner" role="spinner"><div class="spinner-icon">${""}</div></div></div>`
        });

        return true;
      },
      w.processor
    );
  });
});
if (window.runDefer) {
  window.runDefer();
}
