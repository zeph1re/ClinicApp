// Initialize Supabase
import { supabase } from './constant.js';

document.getElementById('logout').addEventListener('submit', async (event) => {
  event.preventDefault();
  await supabase.auth.signOut();
  sessionStorage.removeItem("user");
  window.location.href = "../auth/login.html";
});