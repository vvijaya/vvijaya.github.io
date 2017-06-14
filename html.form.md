---
permalink:      /form/
title:          Form
menu_index:     -1
---
# Form Control

---

<style>
fieldset {
  max-width: 400px;
  margin: auto;
}
fieldset p label * {
  width: 250px;
}
fieldset p label span {
  width: 100px;
  display: inline-block;
  text-align: right;
}
</style>

<form>
  <fieldset>
    <legend>Personalia:</legend>
    <p><label><span>Name:</span>
      <input type="text"/>
    </label></p>
    <p><label><span>Email:</span>
      <input type="email"/>
    </label></p>
    <p><label><span>Phone:</span>
      <input type="tel"/>
    </label></p>
    <p><label><span>File:</span>
      <input type="file"/>
    </label></p>
    <p><label><span>color:</span>
      <input type="color"/>
    </label></p>
    <p><label><span>datetime:</span>
      <input type="datetime-local"/>
    </label></p>
    <p><label><span>month:</span>
      <input type="month"/>
    </label></p>
    <p><label><span>time:</span>
      <input type="time"/>
    </label></p>
    <p><label><span>week:</span>
      <input type="week"/>
    </label></p>
    <p><label><span>url:</span>
      <input type="url"/>
    </label></p>
    <p><label><span>number:</span>
      <input type="number"/>
    </label></p>
    <p><label><span>password:</span>
      <input type="password"/>
    </label></p>
    <p><label><span>radio:</span>
      <input type="radio"/>
    </label></p>
    <p><label><span>checkbox:</span>
      <input type="checkbox"/>
    </label></p>
    <p><label><span>range:</span>
      <input type="range"/>
    </label></p>
    <p><label><span>search:</span>
      <input type="search"/>
    </label></p>
    <p><label><span>btn</span>
      <button>btn</button>
    </label></p>
    <p><label><span>button:</span>
      <input type="button"/>
    </label></p>
    <p><label><span>reset:</span>
      <input type="reset"/>
    </label></p>
    <p><label><span>image:</span>
      <input type="image"/>
    </label></p>
    <p><label><span>submit:</span>
      <input type="submit"/>
    </label></p>
    <p><label><span>Date of birth:</span>
      <input type="date"/>
    </label></p>
    <p><label><span>optgroup</span>
      <select>
        <optgroup label="Swedish Cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </optgroup>
      </select>
    </label></p>
    <p><label><span>textarea</span>
      <textarea></textarea>
    </label></p>
    <p><label><span>datalist</span>
      <input list="browsers">
      <datalist id="browsers">
        <option value="Internet Explorer"/>
        <option value="Firefox"/>
        <option value="Chrome"/>
        <option value="Opera"/>
        <option value="Safari"/>
      </datalist>
    </label></p>
    <p>lorem</p>
    <p><label><span>meter 1</span>
      <meter value="2" min="0" max="10">2 out of 10</meter>
    </label></p>
    <p><label><span>meter 2</span>
      <meter value="0.6">60%</meter>
    </label></p>
  </fieldset>
</form>

---
