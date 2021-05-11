DDELIMITER //
CREATE PROCEDURE checkTypeCoupon (
in id_type_coupon int,
in title varchar(50),
in SEOXU int,
out result int
)

BEGIN 
	IF (select count(*)
    from type_coupon
    where type_coupon.id_type_coupon = id_type_coupon ) =1  Then set result = 1; 
    ELSE set result =-1;
    END IF;
    END; //

 CREATE PROCEDURE typeCoupon (
 in id_type_coupon int,
 in title varchar(50),
 in SEOXU int,
 out result int
 )
 BEGIN
 IF ( select count(*) 
 from type_coupon where type_coupon.id_type_coupon= id_type_coupon)>=1 Then set result =-1;
 ELSE 
 insert into type_coupon(id_type_coupon,title,SEOXU)
 value (id_type_coupon,title,SEOXU);
 insert into img(obj_id,obj_type,img_url )
 value ( id_type_coupon,2, " " );
 select 1 as result; 
 END IF;
 END; //

CREATE PROCEDURE uploadImgVoucher(
	in url varchar (255),
    in id_type_coupon varchar (10)
)

BEGIN 
SET SQL_SAFE_UPDATES=0;
	update img set img_url= url where obj_id = id_type_coupon and obj_type='2';
	SET SQL_SAFE_UPDATES=1;
END;// 

CREATE PROCEDURE deleteVoucher (
	in id_type_coupon int,
    in SEOXU int,
    out result int
)
BEGIN 
SET SQL_SAFE_UPDATES=0;
DELETE from coupon where coupon.id_type_coupon = id_type_coupon;
DELETE from img where obj_id = id and obj_type = 2;
SET SQL_SAFE_UPDATES=1;
        select 1 as result;
END; //

DELIMITER ;



