/* global Reflect */
window.afterLib.push(() => {
    const w = window,
        int = (i) => {
            return Number(i);
        }, str = (i) => {
            return String(i);
        }, flipAxis = (csv, delimiter = ",", linebreak = "\n") => {
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
        smartlink = (str) => {
            return w.marked(`<${str}>`).includes("<a href=") && str.includes("@") ? `<${str}>` : str;
        },
        drawReport = (F) => {
            let outHTML = "", limit = int("100");

            limit = w.qs2obj.limit ? w.qs2obj.limit : limit;

            outHTML += `<div id='report_${w.md5(F.name)}' class='report'>`;
            outHTML += "<span class='data-meta'>";
            outHTML += w.marked(`**${F.name}** <br> _containing **${F.reportGObj.length}** group(s)_
                from **${F.reportGObj.length > int("1") ? F.reportObj.data.length - F.reportGObj.length : F.reportObj.data.length}** data.
            `);
            outHTML += "</span>";
            outHTML += `
                <p><label><input id='swap_rows_cols' class='input-control' type='checkbox'/><span class='input-face'></span>
                <span>Swap rows &amp; columns</span></label></p>

                <input id= 'group_list_${w.md5(F.name)}' class='group-list-ctrl input-control' type='checkbox'/>
                <label for='group_list_${w.md5(F.name)}' class='group-list-face'><span class='input-face'></span>
                <span>Show 1st group only.</span>
                </label>

                <ul class='data-group-list'>
            `;

            /* GROUP */
            F.reportGObj.forEach((grp, gi) => {
                if (gi < limit) {
                    outHTML += `
                        <li class='group group-${gi}'>
                        <span class='group-meta'><b><i># ${++grp.meta.id || int("1")} × ${grp.data.length} row(s)</i></b></span>
                        <input id= 'group_${gi}_${w.md5(F.name)}' class='group-ctrl input-control' type='checkbox'/>
                        <label for='group_${gi}_${w.md5(F.name)}' class='group-face'><span class='input-face'></span>
                        </label>
                        <ul>
                    `;

                    /* DATAROW */
                    grp.data.forEach((obj, ri) => {
                        if (ri < limit) {
                            outHTML += `
                                <li class='clearfix list list-${ri}'>
                                <input id= 'list_${gi}_${ri}_${w.md5(F.name)}' class='list-ctrl input-control' type='checkbox'/>
                                <label for='list_${gi}_${ri}_${w.md5(F.name)}' class='list-face'><span class='input-face'></span>
                                </label>
                                <span class='data-list'>
                            `;
                            for (const key in obj) {
                                if (Reflect.has(obj, key)) {
                                    outHTML += w.marked(`**${smartlink(key)}** : ${smartlink(obj[key])}`).split("href=").join("target='_blank' href=");
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
        };

    w.processor = (F) => {
        try {
            if (w.dz.face.innerHTML.indexOf("</div>") < int("0")) {
                w.dz.face.innerHTML = "";
            }
            w.dz.face.innerHTML += `<div title="${F.name}"> • ${F.name}</div>`;

            F.reportObj = w.Papa.parse(F.dataTXT, {
                "header": true,
                "dynamicTyping": true,
                "skipEmptyLines": true,
            });
            F.dataTXTFlip = flipAxis(F.dataTXT, F.reportObj.delimiter, F.reportObj.linebreak);
            let firstK = 0, gid = 0;

            firstK = F.reportObj.meta.fields[int("0")];

            F.reportGObj = [];
            F.reportObj.data.forEach((rowCSV) => {
                if (rowCSV[firstK] === "") {
                    F.reportGObj.push({
                        "meta": {
                            "id": gid++
                        },
                        "data": []
                    });
                } else if (F.reportGObj.length > int("0")) {
                    F.reportGObj[F.reportGObj.length - int("1")].data.push(rowCSV);
                }
            });
            F.reportGObj = F.reportGObj.length ? F.reportGObj : [F.reportObj];

            w.reportModal.close();
            w.removeClass(w.one(".step.hide"), "hide");

            w.dz.files.forEach((file) => {
                if (w.one(`#report_${w.md5(file.name)}`)) {
                    w.one(`#report_${w.md5(file.name)}`).parentNode.removeChild(w.one(`#report_${w.md5(file.name)}`));
                }
                w.one("#report").innerHTML += drawReport(file);
            });
        } catch (error) {
            console.warn(error);
            w.reportModal = new w.Modal({
                "id": "reportModal",
                "header": "Error",
                "body": `Close this modal to refresh this page<br><br><b>${error}</b>`
            }, () => {
                str(location);
            });
        }
    };

    w.on(w.one("#full_container"), "change", () => {
        w.toggleClass(w.one(".container"), "full");
    });

    w.dz = new w.DropZone(w.one("#dz_ctrl"), w.one("#dz_face"));
    w.on([w.dz.ctrl, w.dz.face], "drop dragover dragend dragleave change", (e) => {
        w.dz.fileHandler(
            ((e) => {
                e.preventDefault();
                if (e.type === "dragover") {
                    w.addClass(w.dz.face, "hover");
                } else
                if (e.type === "dragend") {
                    w.removeClass(w.dz.face, "hover");
                } else
                if (e.type === "dragleave") {
                    w.removeClass(w.dz.face, "hover");
                } else
                if (e.type === "drop") {
                    w.removeClass(w.dz.face, "hover");
                }

                return e;
            })(e),
            (F) => {
                w.dz.files.forEach((file) => {
                    if (file.name === F.name) {
                        F.isDuplicate = true;
                    }
                });
                if (F.isDuplicate) {
                    F.modal = new w.Modal({
                        "header": "Duplicate",
                        "body": "Oh boy, there’s a duplicate file, try renaming first"
                    });

                    return false;
                }
                if (F.size > int("10e6")) {
                    F.modal = new w.Modal({
                        "header": "File too big",
                        "body": "MAN~~ try smaller file; max 10MB, okay?"
                    });

                    return false;
                }
                if (F.type !== "text/csv" &&
                    F.type !== "text/plain" &&
                    F.type !== "application/vnd.ms-excel" &&
                    F.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                    F.type !== "") {
                    F.modal = new w.Modal({
                        "header": "Invalid file",
                        "body": "only accept CSV file, .txt based file"
                    });

                    return false;
                }
                w.reportModal = new w.Modal({
                    "id": "reportModal",
                    "className": "sticky loading",
                    "header": "Loading",
                    "body": "<div id='nprogress'><div class='spinner' role='spinner'><div class='spinner-icon'></div></div></div>"
                });

                return true;
            }, w.processor
        );
    });
});