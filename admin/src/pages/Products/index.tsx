import {
  StyledCircle,
  StyledProfileItem,
  StyledProfileItemTitle,
} from "pages/Profile/Styles";
import {
  StyledUserCard,
  StyledUserImage,
  StyledUserInfo,
} from "pages/Users/Styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "shared/constants/const";
import { createNotification } from "shared/features/notify/notifySlice";
import { initProducts, Product } from "shared/features/products/productsSlice";
import useQuery from "shared/hooks/useQuery";
import { colors } from "shared/utils/Styles";
import { StyledProductCard, StyledProductCardImages } from "./Styles";

const Products: React.FC = () => {
  const products = useSelector((state: any) => state.products.products);
  const query = useQuery("get", `${baseUrl}/products`);
  useEffect(() => {
    query.execute();
  }, []);

  const dispatch = useDispatch();
  if (query.data) {
    dispatch(initProducts(query.data));
  }

  if (query.error) {
    dispatch(createNotification(query.error));
  }

  return (
    <main
      style={{
        padding: "1em 1em",
      }}
    >
      {products.map((product: Product) => {
        return (
          <StyledProductCard key={product.id}>
            <StyledProductCardImages>
              {product.images.map((image) => {
                return <StyledUserImage src={image} />;
              })}
            </StyledProductCardImages>
            <StyledUserCard>
              <StyledUserInfo>
                <StyledProfileItem>
                  <StyledProfileItemTitle>Name:</StyledProfileItemTitle>
                  <p>{`${product.name}`}</p>
                </StyledProfileItem>
                <StyledProfileItem>
                  <StyledProfileItemTitle>Owner:</StyledProfileItemTitle>
                  {product.userId && (
                    <p>{`${product.userId.firstName} ${product.userId.lastName}`}</p>
                  )}
                </StyledProfileItem>
                <StyledProfileItem>
                  <StyledProfileItemTitle>price:</StyledProfileItemTitle>
                  <p>{`${product.price}`}</p>
                </StyledProfileItem>
              </StyledUserInfo>
              <StyledUserInfo>
                <StyledProfileItem>
                  <StyledProfileItemTitle>Condition:</StyledProfileItemTitle>
                  <p>{`${product.condition}`}</p>
                </StyledProfileItem>
                <StyledProfileItem>
                  <StyledProfileItemTitle>isAvailable:</StyledProfileItemTitle>
                  {product.isAvailable ? (
                    <StyledCircle color={colors.success} />
                  ) : (
                    <StyledCircle color={colors.danger} />
                  )}
                </StyledProfileItem>
                <StyledProfileItem>
                  <StyledProfileItemTitle>isVerified:</StyledProfileItemTitle>
                  {product.isVerified ? (
                    <StyledCircle color={colors.success} />
                  ) : (
                    <StyledCircle color={colors.danger} />
                  )}
                </StyledProfileItem>
              </StyledUserInfo>
              <StyledUserInfo>
                <StyledProfileItem>
                  <StyledProfileItemTitle>Category:</StyledProfileItemTitle>
                  {product.categoryId && <p>{`${product.categoryId.name}`}</p>}
                </StyledProfileItem>
              </StyledUserInfo>
            </StyledUserCard>
          </StyledProductCard>
        );
      })}
    </main>
  );
};

export default Products;
