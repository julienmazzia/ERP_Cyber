const express = require('express')
const app = express();
const bodyParser = require('body-parser');

var sql = require('./Connection.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server online')
});

  app.get('/Company/getAll', function (req, res, next) {
    sql.query("Select * from Compagnie;", function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Company/add', function (req, res, next) {
      var data = req.body;
      sql.query('INSERT INTO compagnie (NOM, TELEPHONE, MAIL,  ADRESSE, CODE, VILLE) VALUES ( "' + data.name + '", "' + data.tel + '", "' + data.mail  + '","' + data.street + '", "' + data.code +  '", "' + data.city + '");');
      res.end("Done");
  });

  app.post('/Company/update', function (req, res, next) {
      var data = req.body;
    sql.query('UPDATE Compagnie SET Nom = "' + data.name + '", TELEPHONE = "' + data.tel + '", MAIL = "' + data.mail + '", Adresse = "' + data.street + '", CODE ="' + data.code + '", VILLE ="' + data.city + '" WHERE ID_COMPAGNIE = '+ data.id + ';');
    res.end("Done");
  });

  app.post('/Company/delete', function (req, res) {
    sql.query('DELETE FROM Compagnie WHERE ID_COMPAGNIE=' + req.body.id);
    res.send("done");
});

  app.get('/Employees/getAll', function (req, res, next) {
    sql.query("Select * from Employe;", function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Employees/getEmployee', function (req, res) {
      sql.query("Select * from Employe where ID_EMPLOYE = " + req.body.id, function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Employees/Add', function (req, res) {
      var data = req.body;
      sql.query('INSERT INTO Employe(NOM, PRENOM, FONCTION, MAIL) VALUES ("' + data.name + '", "' + data.firstname + '", "' + data.function + '", "' + data.mail + '") ;');
      res.send("done");
  });

  app.post('/Employees/update', function (req, res) {
      var data = req.body;
    sql.query('UPDATE Employe SET NOM ="' + data.name + '", PRENOM ="' + data.firstname + '", FONCTION ="' + data.function + '", mail= "' + data.mail + '" where ID_EMPLOYE = ' + data.id + ';');
    res.send("done");
  });

  app.post('/Employees/delete', function (req, res) {
      sql.query('DELETE FROM Employe WHERE ID_EMPLOYE=' + req.body.id);
      res.send("done");
  });


  app.get('/Plan/getAll', function (req, res, next) {
    sql.query("Select * from Plan", function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Plan/Add', function(req, res) {
      var data = req.body;
      sql.query('INSERT INTO Plan(DESIGNATION, ID_COMPAGNIE) VALUES("' + data.des + '", ' + data.id + ');');
      res.send("Done")
  });

  app.post('/Plan/update', function(req, res) {
      var data = req.body;
      sql.query('Update Plan SET DESIGNATION = "' + data.des + '", ID_COMPAGNIE = ' + data.id_company + ' where ID_PLAN =' + data.id + ';');
      res.send("Done");
  });

  app.post('/Plan/delete', function(req, res) {
      sql.query('DELETE FROM Assemblage  WHERE ID_PLAN =' + req.body.id);
      sql.query('DELETE FROM Composition_plan  WHERE ID_PLAN =' + req.body.id);
      sql.query('DELETE FROM Plan  WHERE ID_PLAN =' + req.body.id);
      res.send("Done");
  });

  app.post('/Plan/getAllPieceAssociated', function (req, res, next) {
    sql.query("Select * from Composition_plan WHERE ID_PLAN=" + req.body.id, function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Plan/AssociateToPlan', function(req, res) {
    sql.query('INSERT INTO Composition_plan(ID_PLAN, ID_PIECE) VALUES (' + req.body.id_plan + ', ' + req.body.id_piece + ')');
    res.send("Done");
});

app.post('/Plan/deleteAssocitation', function(req, res) {
    sql.query('DELETE FROM Composition_plan  WHERE ID_COMPOSITION_PLAN =' + req.body.id);
    res.send("Done");
});

  app.get('/Piece/getAll', function (req, res, next) {
    sql.query("Select * from Piece", function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Piece/getPiece', function (req, res, next) {
    var data = req.body

    sql.query("Select * from Piece WHERE ID_PIECE =" + data.id, function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Piece/add', function(req, res) {
    var data = req.body;
    sql.query('INSERT INTO Piece(NOM, PRIX) VALUES("' + data.name + '", ' + data.cost + ');');
    res.send("Done");
  });

    app.post('/Piece/update', function(req, res) {
        var data = req.body;
        sql.query('Update Piece SET NOM = "' + data.name + '", PRIX = ' + data.cost + ' where ID_PIECE=' + data.id);
        res.send("Done");
    });

    app.post('/Piece/delete', function(req, res) {
        sql.query('DELETE FROM Piece  WHERE ID_PIECE =' + req.body.id);
        res.send("Done");
    });

  app.get('/Series/getAll', function (req, res, next) {
    sql.query("Select * from Chaine", function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
  });

  app.post('/Series/getElements', function (req, res) {
    var data = req.body
    if(data.type === "Assemblage") {
      sql.query('Select * from Assemblage WHERE ID_CHAINE=' + data.id, function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
      res
    } else {
      sql.query('Select * from Production WHERE ID_CHAINE=' + data.id, function (err, result) {

        if(err) {
            console.log("error: ", err);
        }
        else{
          res.end(JSON.stringify(result));
        }
      }); 
    }
  })

  app.post('/Series/add', function(req, res) {
    var data = req.body;
    sql.query('INSERT INTO Chaine (TYPE) VALUES("' + data.type + '");');
    res.send("Done");
  });

    app.post('/Series/updateType', function(req, res) {
        var data = req.body;
        if(data.type === "Assemblage") {
            sql.query('DELETE FROM Production WHERE ID_CHAINE =' + data.id +';');
        } else {
            sql.query('DELETE FROM Assemblage WHERE ID_CHAINE =' + data.id +';');
        }
        sql.query('Update Chaine SET TYPE = "' +data.type + '" where ID_CHAINE =' +data.id);
        res.send("Done");
    });

    app.post('/Series/addProduct', function(req, res) {
        var data = req.body;
        if(data.type === "Assemblage") {
            sql.query('INSERT INTO Assemblage (ID_CHAINE, ID_PLAN) VALUES (' + data.id_chaine + ', ' + data.id + ')');
        } else {
            sql.query('INSERT INTO Production (ID_CHAINE, ID_PIECE) VALUES (' + data.id_chaine + ', ' + data.id + ')');
        }
        res.send("Done");
    });

    app.post('/Series/removeProduct', function(req, res) {
        var data = req.body;
        if(data.type === "Assemblage") {
            sql.query('DELETE FROM Assemblage WHERE ID_CHAINE =' + data.id_chaine + ' AND ID_PLAN =' + data.id);
        } else {
            sql.query('DELETE FROM Production WHERE ID_CHAINE =' + data.id_chaine + 'AND ID_PIECE =' + data.id);
        }
        res.send("Done");
    });

    app.post('/Series/delete', function(req, res) {
        sql.query('DELETE FROM Assemblage WHERE ID_CHAINE =' + req.body.id);
        sql.query('DELETE FROM Production WHERE ID_CHAINE =' + req.body.id);
        sql.query('DELETE FROM Chaine  WHERE ID_CHAINE =' + req.body.id);
        res.send("Done");
    });

  

app.listen(8000, () => {
  console.log('Server online')
});