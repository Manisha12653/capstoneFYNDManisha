const express = require("express");
const router = express.Router();

const Page = require("../models/page");

// GET /pages

router.get("/", async (req, res) => {
  try {
    const pages = await Page.find({});
    res.json(pages);
  } catch (e) {
    res.json(e);
  }
});

// POST /pages
router.post("/", (req, res) => {
  const name = req.fields.name;
  const slug = req.fields.slug;

  const page = new Page({
    name: name,
    slug: slug,
  });

  page.save((error) => {
    if (error) console.log(error);
    res.status(201).end();
  });
});

// PUT /pages/
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const name = req.fields.name;
  const slug = req.fields.slug;

  Page.findById(id, (error, page) => {
    if (error) console.log(error);

    page.name = name;
    page.slug = slug;

    page.save((error) => {
      if (error) console.log(error);
      res.status(201).end();
    });
  });
});

// PUT /delete/
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Page.findByIdAndRemove(id, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.status(204).end();
    }
  });
});

module.exports = router;
