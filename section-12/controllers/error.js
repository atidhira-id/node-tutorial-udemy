export const get404Page = (req, res) => {
  res.status(404).render("404", { docTitle: "Page not found" });
};
