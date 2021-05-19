DELIMITER //
CREATE PROCEDURE checkTypeCoupon (
in id_type_coupon int,
in title varchar(50),
in SEOXU int,
out result int
)

BEGIN 
	IF (select count(*)
    from type_coupon
    where type_coupon.title = title and type_coupon.SEOXU = SEOXU ) =1  Then set result = 1; 
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
 IF ( select count(*) from type_coupon where type_coupon.title= title and type_coupon.SEOXU= SEOXU )>=1 
 THEN  call checkTypeCoupon (id_type_coupon,title,SEOXU, @result1);
	IF(@result=1)
    THEN select result = -1;
    END IF;
ELSE 
 insert into type_coupon(id_type_coupon,title,SEOXU)
 value (id_type_coupon,title,SEOXU);
 insert into img(obj_id,obj_type,img_url )
 value ( id_type_coupon,3, " " );
 select 1 as result; 
 END IF;
 END; //

CREATE PROCEDURE uploadImgVoucher(
	in url varchar (255),
    	in id_type_coupon varchar (10)
)

BEGIN 
SET SQL_SAFE_UPDATES=0;
	update img set img_url= url where obj_id = id_type_coupon and obj_type='3';
	SET SQL_SAFE_UPDATES=1;
END;// 

CREATE PROCEDURE deleteVoucher (
	in id_type_coupon int,
    in SEOXU int,
    out result int
)
BEGIN 
SET SQL_SAFE_UPDATES=0;
DELETE from type_coupon where type_coupon.id_type_coupon = id_type_coupon;
DELETE from img where obj_id = id and obj_type = 3;
SET SQL_SAFE_UPDATES=1;
        select 1 as result;
END; //


CREATE PROCEDURE updateCoupon (
	in id int,
	in title varchar (50),
	in SEOXU int,
	in img_url varchar (255),
	out result int
)

BEGIN 
IF (select count(*) from type_coupon) >0
THEN
	IF (select count(*) from type_coupon where type_coupon.id_type_coupon = id ) = 1
	THEN 
		UPDATE type_coupon SET title = title, SEOXU=SEOXU where id_type_coupon = id;
		UPDATE img SET img_url = img_url where obj_id=id;
		select 1 as result; -- update sucess
		ELSE 
			select -1 as result;
		END IF;
	ELSE
		select 0 as result;
	END IF;//
		
DELIMITER ;


