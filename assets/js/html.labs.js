window.defer.push(() => {
  window.NativeUtils.merge(window, window.NativeUtils);
  const w = window;

  w.dz = new w.DropZone(w.oneDOM("#dz_ctrl"), w.oneDOM("#dz_face"));
  w.on([w.dz.ctrl, w.dz.face], "drop dragover dragend dragleave change", e => {
    w.dz.fileHandler(
      (e => {
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
      (F, C) => {
        w.tmp = false;
        C.forEach($C => {
          if ($C.name === F.name) {
            w.tmp = new w.Modal({
              header: "Duplicate",
              body: "Oh boy, there’s a duplicate file, try renaming first"
            });
          }
        });
        if (F.size > 10e6) {
          w.tmp = new w.Modal({
            header: "File too big",
            body: "MAN~~ try smaller file; max 10MB, okay?"
          });
        }
        if (
          F.type !== "text/csv" &&
          F.type !== "text/plain" &&
          F.type !== "application/vnd.ms-excel" &&
          F.type !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
          F.type !== ""
        ) {
          w.tmp = new w.Modal({
            header: "Invalid file",
            body: "only accept CSV file, .txt based file"
          });
        }

        return !w.tmp;
      },
      F => {
        w.dz.face.innerHTML =
          w.dz.face.innerHTML.indexOf("</div>") < 0 ? "" : w.dz.face.innerHTML;
        w.dz.face.innerHTML += `<div title='${F.name}'> • ${F.name}</div>`;
      }
    );
  });
  w.updateGallery = (G, idx = 1) => {
    let list = 0,
      src = 0,
      oldImg = 0,
      newImg = 0,
      caption = G.dataset.caption === "",
      last = 0;

    list = JSON.parse(G.dataset.img);
    last = list.length - 1;
    idx =
      idx === Number(idx)
        ? idx + (Number(G.dataset.idx) || 0)
        : Number(idx) || 0;
    idx = idx < 0 ? last : idx;
    idx = idx > last ? 0 : idx;
    src = list[Number(G.dataset.idx)];
    src = src.src ? src.src : src;
    oldImg = w.oneDOM(`img[src='${src}']`, G) || w.oneDOM("img", G);
    src = list[idx];
    w.tmp = src.caption ? src.caption : " ";
    caption = caption ? w.tmp : false;
    if (caption) {
      w.oneDOM(".caption", G).innerHTML = caption;
    }
    src = src.src ? src.src : src;
    newImg = w.oneDOM(`img[src='${src}']`, G);
    if (!newImg) {
      newImg = w.stringToDOM(
        '<img alt="Gallery image" class="ease waitload unload">'
      );
      newImg.src = src;
      oldImg.parentNode.appendChild(newImg);
      w.addClass(oldImg, "waitload");
      w.on(
        newImg,
        "load",
        ((oldImg, newImg) => {
          return () => {
            w.removeClass([oldImg, newImg], "waitload");

            return false;
          };
        })(oldImg, newImg)
      );
    }
    G.dataset.idx = idx;
    w.removeClass(w.allDOM(".bullet", G), "hover");
    w.addClass(w.oneDOM(`.bullet[data-idx='${idx}']`, G), "hover");
    w.removeClass(newImg, "unload");
    w.addClass(oldImg, "unload");
  };
  w.on(w.allDOM(".gallery .unload"), "load", e => {
    w.removeClass(e.target, "unload");

    return false;
  });
  w.on(w.allDOM(".gallery .prev, .gallery .next"), "click", e => {
    let G = e.target;

    while (!w.hasClass(G, "gallery")) {
      G = G.parentNode;
    }
    w.tmp = w.hasClass(e.target, "prev")
      ? w.updateGallery(G, -1)
      : w.updateGallery(G, 1);

    return false;
  });
  w.allDOM(".gallery").forEach(G => {
    let B = 0,
      F = 0,
      list = [];

    try {
      list = JSON.parse(G.dataset.img);
    } catch (e) {
      // console.warn(e.message)
    }
    G.swipable = new w.Swipe();
    w.on(
      G,
      "touchstart touchmove",
      (G => {
        return e => {
          G.swipable.run(e, {
            onRight: () => {
              w.updateGallery(G, -1);

              return false;
            },
            onLeft: () => {
              w.updateGallery(G, 1);

              return false;
            }
          });
        };
      })(G)
    );

    if (G.dataset.caption === "" && !w.oneDOM(".caption", G)) {
      G.appendChild(w.stringToDOM('<figcaption class="caption"></figcaption>'));
    }
    if (G.dataset.bullet === "" && !w.oneDOM(".bullet", G)) {
      F = w.stringToDOM("<figcaption></figcaption>");
      list.forEach((j, i) => {
        B = w.stringToDOM(`<span class="bullet" data-idx="${i}"></span>`);
        w.on(
          B,
          "click",
          ((G, i) => {
            return () => {
              w.updateGallery(G, `${i}`);

              return false;
            };
          })(G, i)
        );
        F.appendChild(B);
      });
      G.appendChild(F);
    }
    G.dataset.idx = G.dataset.idx || "0";
    w.updateGallery(G, G.dataset.idx);
  });
});
if (window.runDefer) {
  window.runDefer();
}
