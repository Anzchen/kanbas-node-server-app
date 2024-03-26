import db from "../Database/index.js";
function ModuleRoutes(app) {
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
      });
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules
        .filter((m) => m.course === cid);
        res.send(modules);
    });
}
export default ModuleRoutes;