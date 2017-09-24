<report>
<style>
:scope { font-size: 1em }
#dz_face {
    padding: 1em 2em;
    width: 100%;
    max-width: 100%;
}
#dz_face.hover {
    border-color: #36f; background: #cdf;
}
.step-loading {
    opacity: .3;
    pointer-events: none;
    user-select: none;
}
.input-control[type=checkbox] + label .input-face,
.input-control[type=radio] + label .input-face,
.input-control[type=checkbox] + .input-face,
.input-control[type=radio] + .input-face,
.input-control[type=checkbox] + label,
.input-control[type=radio] + label{
    cursor: pointer;
    margin: 0 6px;
}
ul {
    list-style: none;
    padding: 0;
}
.data-group-list .list{
    border-top: solid 1px #999;
    border-right: solid 2em transparent;
    background: #eee;
    padding: .3333em .5em;
}
.data-group-list .list:first-child{
    border-top: solid 0;
}
.data-group-list .list:nth-child(even){
    background: #fafafa;
}
.data-group-list .group{
    margin: 1em 0;
    box-shadow: 0 0 0 1px #999;
    border-left: solid 1em;
    border-top: solid 2em;
    border-color: #abc;
}
.data-group-list .group:nth-child(even){
    border-color: #cab;
}
.data-group-list .group .group-meta {
    position: absolute;
    left: 0;
    top: -2em;
    line-height: 2em;
    text-align: left;
}
.data-group-list .group .group-meta * {
    margin: 0;
    font-size: 1em;
}
.data-group-list .group ul {
    overflow: hidden;
}
.data-group-list p {
    margin: 0 4px;
    text-align: left;
}
label.group-face,
label.list-face {
    position: absolute;
    top: 0;
    line-height: 2em;
}
label.group-face { top: -2em;  right: 0; }
label.list-face { right: -2em; }
input[type=checkbox].group-list-ctrl:checked + label + ul.data-group-list .group,
input[type=checkbox].group-ctrl:checked + label + ul .list {
    position: absolute;
    right: 0;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px,1px,1px,1px);
}
input[type=checkbox].group-list-ctrl:checked + label + ul.data-group-list .group:first-child,
input[type=checkbox].group-ctrl:checked + label + ul .list:first-child {
    position: relative;
    overflow: visible;
    height: auto;
}
input[type=checkbox].list-ctrl + label + span.data-list{
    display: block;
    max-height: 3em;
}
input[type=checkbox].list-ctrl:checked + label + span.data-list{
    max-height: none;
}
</style>
<!--  -->


<div class="step">
    <h2>1. Prepare CSV File</h2>

    <p><span>Clickable, Drag'N'Drop CSV File &lt; 10MB</span></p>

    <p><label>
        <input id="dz_ctrl" class="input-control" type="file" multiple="multiple" accept=".csv" title=""/>
        <span id="dz_face" class="input-face"> No File </span>
    </label></p>
</div>

<div class="step hide"><br><hr>
    <h2>2. Review Data</h2>

    <p><label><input id='full_container' class='input-control' type='checkbox'/><span class='input-face'></span>
    <span>Full container</span></label></p>

    <!-- <p><label>
    <button class="step-back">◁ Back</button>
    <button class="step-next">Next ▷</button>
    </label></p> -->

    <h3>{ message }</h3>
<ul>
    <li each={ name in techs }>{ name }</li>
</ul>

</div>

<div id="report_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="report"><span class="data-meta"><p><strong>BlockUserWithSameDeviceAndPassword-grouped.csv</strong><br><em>containing<strong>2084</strong>group(s)</em>
    from<strong>5592</strong>data.</p>
    </span><p><label><input id="swap_rows_cols" class="input-control" type="checkbox"><span class="input-face"></span><span>Swap rows&amp;columns</span></label></p><input id="group_list_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-list-ctrl input-control" type="checkbox"><label for="group_list_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-list-face"><span class="input-face"></span><span>Show 1st group only</span></label><ul class="data-group-list">
    <li class="group group-0"><span class="group-meta"><b><i>#1× 2row(s)</i></b></span>
        <input id="group_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-ctrl input-control" type="checkbox">
        <label for="group_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-face">
            <span>1st</span><span class="input-face"></span>
        </label><ul>
    <li class="clearfix list list-0"><input id="list_0_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-ctrl input-control" type="checkbox"><label for="list_0_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-face"><span class="input-face"></span></label><span class="data-list"><p><strong>latest_login</strong>:y</p>
    <p><strong>user_admin_page</strong>:<a target="_blank" href="https://admin.pomona.co.id/">https://admin.pomona.co.id/</a></p>
    <p><strong>email</strong>:<a target="_blank" href="mailto:test@gmail.com">test@gmail.com</a></p>
    </span></li>
    <li class="clearfix list list-1"><input id="list_0_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-ctrl input-control" type="checkbox"><label for="list_0_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-face"><span class="input-face"></span></label><span class="data-list"><p><strong>latest_login</strong>:n</p>
    <p><strong>user_admin_page</strong>:<a target="_blank" href="https://admin.pomona.co.id/">https://admin.pomona.co.id/</a></p>
    <p><strong>email</strong>:<a target="_blank" href="mailto:test@gmail.com">test@gmail.com</a></p>
    </span></li></ul></li>
    <li class="group group-1"><span class="group-meta"><b><i>#2× 2row(s)</i></b></span>
        <input id="group_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-ctrl input-control" type="checkbox">
        <label for="group_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-face">
            <span>1st</span><span class="input-face"></span>
        </label><ul>
    <li class="clearfix list list-0"><input id="list_1_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-ctrl input-control" type="checkbox"><label for="list_1_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-face"><span class="input-face"></span></label><span class="data-list"><p><strong>latest_login</strong>:y</p>
    <p><strong>user_admin_page</strong>:<a target="_blank" href="https://admin.pomona.co.id/">https://admin.pomona.co.id/</a></p>
    <p><strong>email</strong>:<a target="_blank" href="mailto:test@gmail.com">test@gmail.com</a></p>
    </span></li>
    <li class="clearfix list list-1"><input id="list_1_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-ctrl input-control" type="checkbox"><label for="list_1_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-face"><span class="input-face"></span></label><span class="data-list"><p><strong>latest_login</strong>:n</p>
    <p><strong>user_admin_page</strong>:<a target="_blank" href="https://admin.pomona.co.id/">https://admin.pomona.co.id/</a></p>
    <p><strong>email</strong>:<a target="_blank" href="mailto:test@gmail.com">test@gmail.com</a></p>
    </span></li></ul></li>
    <li class="group group-2"><span class="group-meta"><b><i>#3× 3row(s)</i></b></span>
        <input id="group_2_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-ctrl input-control" type="checkbox">
        <label for="group_2_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="group-face">
            <span>1st</span><span class="input-face"></span>
        </label><ul>
    <li class="clearfix list list-0"><input id="list_2_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-ctrl input-control" type="checkbox"><label for="list_2_0_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-face"><span class="input-face"></span></label><span class="data-list"><p><strong>latest_login</strong>:y</p>
    <p><strong>user_admin_page</strong>:<a target="_blank" href="https://admin.pomona.co.id/">https://admin.pomona.co.id/</a></p>
    <p><strong>email</strong>:<a target="_blank" href="mailto:test@yahoo.com">test@yahoo.com</a></p>
    </span></li>
    <li class="clearfix list list-1"><input id="list_2_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-ctrl input-control" type="checkbox"><label for="list_2_1_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-face"><span class="input-face"></span></label><span class="data-list"><p><strong>latest_login</strong>:n</p>
    <p><strong>user_admin_page</strong>:<a target="_blank" href="https://admin.pomona.co.id/">https://admin.pomona.co.id/</a></p>
    <p><strong>email</strong>:<a target="_blank" href="mailto:test@gmail.com">test@gmail.com</a></p>
    </span></li>
    <li class="clearfix list list-2"><input id="list_2_2_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-ctrl input-control" type="checkbox"><label for="list_2_2_e3fcb8f2ccffb4bbcb8421efe733e5d1" class="list-face"><span class="input-face"></span></label><span class="data-list"><p><strong>latest_login</strong>:n</p>
    <p><strong>user_admin_page</strong>:<a target="_blank" href="https://admin.pomona.co.id/">https://admin.pomona.co.id/</a></p>
    <p><strong>email</strong>:<a target="_blank" href="mailto:test@gmail.com">test@gmail.com</a></p>
    </span></li></ul></li></ul></div>
<!--  -->
<script>
    this.message = "Hello, Riot!";
    this.techs = [1, ...[1000]];
    const w = window,
        int = (i) => {
            return Number(i);
        },
        str = (i) => {
            return String(i);
        },
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
        smartlink = (str) => {
            return w.marked(`<${str}>`).includes("<a href=") && str.includes("@") ? `<${str}>` : str;
        },
        drawReport = (F, opts) => {
            return smartlink(opts);
        },
        listener = () => {
            w.on(w.one("#full_container"), "change", () => {
                w.toggleClass(w.one(".container"), "full");
            });
            w.on(w.all(".swap-rows-cols"), "change", (e) => {
                e = e.target || e.srcElement || e;
                let outHTML = e.checked ? {"flip": true} : {};

                outHTML = drawReport(w.report.dz.files[w.report.dz.filenames[e.dataset.reportId]], outHTML);
                w.one(`#report_${e.dataset.reportId}`).innerHTML = outHTML;
                listener();
            });
        },
        ready = () => ((w) => {
            w.report.dz = new w.DropZone(w.one("#dz_ctrl"), w.one("#dz_face"));
            w.on([w.report.dz.ctrl, w.report.dz.face], "drop dragover dragend dragleave change", (e) => {
                w.report.dz.fileHandler(
                    ((e) => {
                        e.preventDefault();
                        if (e.type === "dragover") {
                            w.addClass(w.report.dz.face, "hover");
                        } else
                        if (e.type === "dragend") {
                            w.removeClass(w.report.dz.face, "hover");
                        } else
                        if (e.type === "dragleave") {
                            w.removeClass(w.report.dz.face, "hover");
                        } else
                        if (e.type === "drop") {
                            w.removeClass(w.report.dz.face, "hover");
                        }

                        return e;
                    })(e),
                    (F) => {
                        w.report.dz.files.forEach((file) => {
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
        })(w);

    w.processor = (F) => {
        try {
            if (w.report.dz.face.innerHTML.indexOf("</div>") < int("0")) {
                w.report.dz.face.innerHTML = "";
            }
            w.report.dz.face.innerHTML += `<div title="${F.name}"> • ${F.name}</div>`;

            const papaConfig = {
                "header": true,
                "dynamicTyping": true,
                "skipEmptyLines": true,
            };
            let firstK = 0,
                gid = 0;

            F.reportObj = w.Papa.parse(F.dataTXT, papaConfig);
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

            F.dataTXTFlip = flipAxis(F.dataTXT, F.reportObj.delimiter, F.reportObj.linebreak);

            F.reportObjFlip = w.Papa.parse(F.dataTXTFlip, papaConfig);
            if (w._.uniq(F.reportObjFlip.meta.fields).length === F.reportObjFlip.meta.fields.length) {
                firstK = F.reportObjFlip.meta.fields[int("0")];
                gid = int("0");
                F.reportGObjFlip = [];
                F.reportObjFlip.data.forEach((rowCSV) => {
                    if (rowCSV[firstK] === "") {
                        F.reportGObjFlip.push({
                            "meta": {
                                "id": gid++
                            },
                            "data": []
                        });
                    } else if (F.reportGObjFlip.length > int("0")) {
                        F.reportGObjFlip[F.reportGObjFlip.length - int("1")].data.push(rowCSV);
                    }
                });
                F.reportGObjFlip = F.reportGObjFlip.length ? F.reportGObjFlip : [F.reportObjFlip];
            } else {
                F.reportObjFlip = false;
                F.reportGObjFlip = false;
            }

            w.reportModal.close();
            w.removeClass(w.one(".step.hide"), "hide");

            w.report.dz.filenames = {};
            w.report.dz.files.forEach((file, index) => {
                w.report.dz.filenames[w.md5(file.name)] = index;
                if (w.one(`#report_${w.md5(file.name)}`)) {
                    w.one(`#report_${w.md5(file.name)}`).innerHTML = drawReport(file);
                }
                // w.one("#report").innerHTML += `<div id='report_${w.md5(F.name)}' class='report'>${drawReport(file)}</div>`;
                listener();
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
    
    this.on("mount", ready);
    w.report = this
</script>
</report>