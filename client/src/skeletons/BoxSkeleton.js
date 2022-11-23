import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function BoxSkeleton() {
  return (
    <Card sx={{ maxWidth: 720, m: 2, marginLeft: 50, marginTop: 2 }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      {
        <Skeleton
          sx={{ height: 480, width: 720 }}
          animation="wave"
          variant="rectangular"
        />
      }

      <CardContent>
        {
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        }
      </CardContent>
    </Card>
  );
}

export default BoxSkeleton;
