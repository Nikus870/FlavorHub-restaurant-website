document.addEventListener("DOMContentLoaded",()=>{
const form=document.getElementById("reservation-form"),msg=document.getElementById("reservation-message");if(!form)return;
const date=form.querySelector('[name="date"]');date.min=new Date().toISOString().split("T")[0];
form.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(form).entries());d.id=Date.now();d.status="Confirmed";const old=JSON.parse(localStorage.getItem("reservations")||"[]");old.push(d);localStorage.setItem("reservations",JSON.stringify(old));msg.innerHTML=`<div class="success"><b>Reservation Confirmed!</b><br>${d.name}, your table for ${d.party_size} is booked for ${d.date} at ${d.time}.</div>`;form.reset()};
});